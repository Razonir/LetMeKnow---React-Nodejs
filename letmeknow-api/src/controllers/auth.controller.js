import jwt from "jsonwebtoken";
import config from "../config.js";
import logger from "../logger.js";
import UserModel from "../models/user.model.js";
import KeysManager from "../utils/keys-manager.js";
import {OAuth2Client} from "google-auth-library";

async function loginUser(user) {
	// Create token
	const jwtToken = jwt.sign({ userId: user._id }, KeysManager.privateKey, {
		expiresIn: config.auth.loginExpirationTime * 60 * 60,
		algorithm: "RS256",
	});

	// save user token
	user.token = jwtToken;
	await user.save();

	return user;
}
async function googleLogin(req,res){
	const LMWclientId='778066743071-dq5qlh8n67o54sqrgds2gof341sn7san.apps.googleusercontent.com';
	const googleAuth=new OAuth2Client(LMWclientId);
	const body = req.body;
	const tokenId=body?.tokenId
	if (tokenId == null) {
		res.status(400).send({ message: "Missing tokenId" });
		return;
	}
	const ticket=await googleAuth.verifyIdToken({
		idToken: tokenId,
		audience: LMWclientId,
	})
	const email = ticket.payload.email;
	const token=ticket.payload.sub;
	let user = await UserModel.findOne({ email: email, googleToken:token });
	if (!user){ // Create user in the database if it doesn't exist.
		user = new UserModel({ email: email, googleToken: token });
	}
	user = await loginUser(user);
	logger.debug(`Verified sign-in with google request from ${email}`);
	return res.send({
		message: 'Successfully signed in using google.',
		token: user.token,
		isAdmin:(user.role=="admin")
	});
}
async function login(req, res) {
	try {
		const body = req.body;
		const email = body?.email;
		const password = body?.password;

		if (email == null) {
			res.status(400).send({ message: "Missing email" });
			return;
		}

		if (password == null) {
			res.status(400).send({ message: "Missing password" });
			return;
		}

		// TODO validate email

		logger.debug(`Received login request from ${email}`);

		// Check if user exist in the database
		// TODO: implement password encryption
		let user = await UserModel.findOne({ email: email, password: password });

		if (!user) {
			return res
				.status(400)
				.send({ message: `Incorrect email nor password.` });
		} else {
			user = await loginUser(user);

			logger.debug(`Verified login request from ${email}`);

			return res.send({
				message: 'Successfully logged in',
				token: user.token,
				isAdmin:(user.role=="admin")
			});
		}
	} catch (err) {
		logger.error(`Unexpected error: ${err}`);
		return res.status(500).send({ message: "Internal server error." });
	}
}

async function signup(req, res) {
	try {
		const body = req.body;
		const email = body?.email;
		const password = body?.password;

		if (email == null) {
			res.status(400).send({ message: "Missing email" });
			return;
		}

		if (password == null) {
			res.status(400).send({ message: "Missing password" });
			return;
		}

		// TODO validate email

		logger.debug(`Received sign-up request from ${email}`);

		// Check if user exist in the database
		let user = await UserModel.findOne({ email: email });

		if (!user) {
			// Create user in the database if it doesn't exist
			user = new UserModel({ email: email, password: password });
			await user.save();

			user = await loginUser(user);
			logger.debug(`Verified sign-up request from ${email}`);

			return res.send({
				message: 'Successfully signed up',
				token: user.token,
				isAdmin:(user.role=="admin")
			});
		} else {
			return res
				.status(400)
				.send({ message: `Failed to sign up, this email address is already in use.` });
		}
	} catch (err) {
		logger.error(`Unexpected error: ${err}`);
		return res.status(500).send({ message: "Internal server error." });
	}
}

// async function checkAdminRole(req,res){
// 	console.log("hereCAR")
// 	const bearerAuthHeader = req.headers['authorization'];
// 	const bearerIsAdminHeader = req.headers['isadmin'];
// 	if (typeof bearerAuthHeader !== undefined&&bearerIsAdminHeader !== undefined) {
// 		const bearerAuth = bearerAuthHeader.split(' ');
// 		const bearerIsAdmin = bearerIsAdminHeader.split(' ');
		
// 		if (bearerAuth.length != 2) {
// 			return res.status(401).send({message: "Invalid authorization header"});
// 		}
// 		if(bearerIsAdmin.length!=2)
// 			return res.status(401).send({message: "Invalid isAdmin header"});


// 		const token = bearerAuth['1'];
// 		const isAdmin=bearerIsAdmin['1']

// 		try {
// 			const decoded = jwt.verify(token, KeysManager.publicKey);
// 			req.user = decoded.userId;
// 			const user= await UserModel.findOne({ _id:req.user });
// 			if (!user)
// 				return res.status(400).send({message: "User not found"})	
// 			if(isAdmin=='true'&&(user.role==='user')){
// 				return res.status(401).send({message: "User stated he's admin but he isn't."});
// 			}
// 			console.log("here3")
// 			return res.status(200).send();
// 		} catch (err) {
// 			logger.debug(`catchisA\n`+err)
// 			return res.status(401).send({message: "Invalid authorization token, please re-login."});
// 		}
// 	} else {
// 		logger.debug(`elseisA`)
// 		return res.status(403).send({message: "Unauthorized, please login."});
// 	}
// }

async function checkAdminRole(req,res){
	const bearerAuthHeader = req.headers['authorization'];
    if (typeof bearerAuthHeader !== undefined) {
        const bearerAuth = bearerAuthHeader.split(' ');
        
        if (bearerAuth.length != 2) {
            return res.status(401).send({message: "Invalid authorization header"});
        }

        const token = bearerAuth['1'];
        try {
            const decoded = jwt.verify(token, KeysManager.publicKey);
            req.user = decoded.userId;
            const user= await UserModel.findOne({ _id:req.user });
            if (!user)
                return res.status(400).send({message: "User not found"})	
            if(user.role==='user'){
                return res.status(401).send({message: "Insufficient premissions, You cannot access this page."});
            }
			return res.status(200).send();
        } catch (err) {
            logger.debug(`catchisA\n`+err)
            return res.status(401).send({message: "Invalid authorization token, please re-login."});
        }
    } else {
        logger.debug(`elseisA`)
        return res.status(403).send({message: "Unauthorized, please login."});
    }
}

export default { login, signup,googleLogin ,checkAdminRole};

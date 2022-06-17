import jwt from 'jsonwebtoken';
import KeysManager from "../utils/keys-manager.js";
import UserModel from "../models/user.model.js";

const authMiddleware =async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader != null) {
        const bearer = bearerHeader.split(' ');
        
        if (bearer.length != 2) {
            return res.status(401).send({message: "Invalid authorization header"});
        }

        const token = bearer['1'];

        try {
            const decoded = jwt.verify(token, KeysManager.publicKey);
            req.user = decoded.userId;

            // verify user id in the database.
            const user= await UserModel.findOne({ _id:req.user });
            if (!user)
                return res.status(400).send({message: "User not found"})	
        } catch (err) {
            return res.status(401).send({message: "Invalid authorization token, please re-login."});
        }
    } else {
        return res.status(403).send({message: "Unauthorized, please login."});
    }

    return next();
};

export default authMiddleware;
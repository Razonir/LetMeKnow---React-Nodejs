import jwt from 'jsonwebtoken';
import KeysManager from "../utils/keys-manager.js";
import UserModel from "../models/user.model.js";
import logger from '../logger.js';

const isAdminMiddleware =async (req, res, next) => {
    const bearerAuthHeader = req.headers['authorization'];
    const bearerIsAdminHeader = req.headers['isadmin'];
    if (typeof bearerAuthHeader !== undefined&&bearerIsAdminHeader !== undefined) {
        const bearerAuth = bearerAuthHeader.split(' ');
        const bearerIsAdmin = bearerIsAdminHeader.split(' ');
        
        if (bearerAuth.length != 2) {
            return res.status(401).send({message: "Invalid authorization header"});
        }
        if(bearerIsAdmin.length!=2)
            return res.status(401).send({message: "Invalid isAdmin header"});


        const token = bearerAuth['1'];
        const isAdmin=bearerIsAdmin['1']

        try {
            const decoded = jwt.verify(token, KeysManager.publicKey);
            req.user = decoded.userId;
            const user= await UserModel.findOne({ _id:req.user });
            if (!user)
                return res.status(400).send({message: "User not found"})	
            if(isAdmin=='true'&&(user.role==='user')){
                return res.status(401).send({message: "User stated he's admin but he isn't."});
            }
        } catch (err) {
            logger.debug(`catch2AMid\n`+err)
            return res.status(401).send({message: "Invalid authorization token, please re-login."});
        }
    } else {
        logger.debug(`elseAMid`)
        return res.status(403).send({message: "Unauthorized, please login."});
    }

    return next();
};

export default isAdminMiddleware;
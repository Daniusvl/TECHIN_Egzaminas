import jwt from "jsonwebtoken";
import "dotenv/config";

import userModel from "../../users/userModel.mjs";
import { responseMessage } from "../responseMessage.mjs";

const UNAUTHORIZED_ACCESS = responseMessage("Unauthorized access");
const ACCESS_DENIED = responseMessage("Access denied");

export const authMiddleware = (...roles) => {
    return async function(req, res, next){
        try{
            const authHeader = req.get("Authorization");
            if(!authHeader){
                return res.status(401).json(UNAUTHORIZED_ACCESS);
            }
            const bearer = authHeader.split(" ");
            if(bearer.length !== 2){
                return res.status(401).json(UNAUTHORIZED_ACCESS);
            }
            const token = bearer[1];
            if(!token){
                return res.status(401).json(UNAUTHORIZED_ACCESS);
            } 
    
            const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
            if(!payload){
                return res.status(401).json(UNAUTHORIZED_ACCESS);
            }
            
            const user = await userModel.findById(payload.user._id);
            if(!user){
                throw Error("User no longer exists");
            }

            if(!roles){
                roles = ["USER"];
            }

            if(!roles.includes(user.role)){
                return res.status(403).json(ACCESS_DENIED);
            }

            req.user = user;

            next();
        }
        catch(error){
            console.error(error);
            return res.status(401).json(UNAUTHORIZED_ACCESS);
        }
    };
};
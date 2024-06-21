import userModel from "./userModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

const USER_ALREADY_EXISTS = responseMessage("This user already exists");
const INVALID_EMAIL_OR_PASSWORD = responseMessage("Invalid email/password");
const NOT_FOUND = responseMessage("user not found");

export const userController = {
    createUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
        
            const doesExist = await userModel.findOne({ email });
            
            if(doesExist){
                return res.status(409).json(USER_ALREADY_EXISTS);
            }
            
            const hashedPassword = await bcrypt.hash(password, 8);
    
            const user = {
                email,
                password: hashedPassword
            };
    
            const result = await userModel.create(user);
    
            const newUser = {
                _id: result._id,
                email: result.email,
                role: result.role
            };
    
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userModel.findOne({email});

            if(!user){
                return res.status(401).json(INVALID_EMAIL_OR_PASSWORD);
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                return res.status(401).json(INVALID_EMAIL_OR_PASSWORD);
            }

            const newUser = {
                _id: user._id,
                email: user.email,
                role: user.role
            };

            const token = jwt.sign( {user: newUser} , process.env.JWT_ACCESS_TOKEN, {
                expiresIn: "1h",
            });

            return res.status(200).json({token});
        } catch (error) {
            next(error);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const user = await userModel.findById(req.params.id);

            if(!user){
               return res.status(404).json(NOT_FOUND);
            }

            const newUser = {
                _id: user._id,
                email: user.email,
                role: user.role
            };

            return res.status(200).json(newUser);
        } catch (error) {
            next(error);
        }
    }
};
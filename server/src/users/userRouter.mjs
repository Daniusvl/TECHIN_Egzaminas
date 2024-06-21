import express from "express";
import { userController } from "./userController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { USER } from "./userModel.mjs";
import { LoginValidation, RegisterValidation, getByIdValidation } from "./userValidators.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";

const userRouter = express.Router();

userRouter.post("/register", [RegisterValidation, validationMiddleware], userController.createUser);

userRouter.post("/login", [LoginValidation, validationMiddleware], userController.loginUser);

userRouter.get("/:id", [authMiddleware(USER), getByIdValidation, validationMiddleware], userController.getUserById);

export {userRouter};
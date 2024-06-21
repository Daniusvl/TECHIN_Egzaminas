import { Schema, model } from "mongoose";

export const ROLES = ["USER", "ADMIN"];
export const USER = "USER";
export const ADMIN = "ADMIN";

const userModel = Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ROLES, required: true, default: USER }
    },
    { 
        versionKey: false 
    }
);

export default model("User", userModel, "Users");
import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";

const emailValidation = 
{
    isEmail: {
        errorMessage: "Email must be valid",
    },
};

const passwordValidation =
{
    isLength: {
        options: { min: 8, max: 20 },
        errorMessage: "Password must be between 8 and 20 characters",
    },
    matches: {
        options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~#^_+=\-';,./|":<>?])[A-Za-z\d@$!%*?&~#^_+=\-';,./|":<>?]{8,20}$/,
        errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
};

export const RegisterValidation = checkSchema({
    email: emailValidation,
    password: passwordValidation,
    repeatPassword: {
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: "Passwords do not match"
        },
    }
});

export const LoginValidation = checkSchema({
    email: emailValidation,
    password: passwordValidation,
});

export const getByIdValidation = checkSchema({
    id:{
        in:["params"],
        custom: isValidMongooseId
    }
});
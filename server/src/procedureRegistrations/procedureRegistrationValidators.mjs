import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";



export const createValidation = checkSchema({
    procedureId: {
        custom: isValidMongooseId
    },
});

export const updateValidation = checkSchema({
    _id:{
        custom: isValidMongooseId
    },
    procedureId: {
        custom: isValidMongooseId
    },
});

export const approveValidation = checkSchema({
    id:{
        in:["params"],
        custom: isValidMongooseId
    },
});

export const deleteValidation = checkSchema({
    id:{
        in:["params"],
        custom: isValidMongooseId
    }
});

export const getByIdValidation = checkSchema({
    id:{
        in:["params"],
        custom: isValidMongooseId
    }
});
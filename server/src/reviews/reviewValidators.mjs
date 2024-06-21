import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";


const scoreValidator = {
    custom: v => {
        if(v < 0 || v > 5){
            throw new Error("Score must be between 0 and 5");
        }
        return true;
    }
};

export const createValidation = checkSchema({
    procedureRegistrationId: {
        custom: isValidMongooseId
    },
    score: scoreValidator
});

export const updateValidation = checkSchema({
    _id:{
        custom: isValidMongooseId
    },
    score: scoreValidator
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

export const getProcedureAvgScoreValidation = checkSchema({
    prcedureId: {
        custom: isValidMongooseId
    }
})
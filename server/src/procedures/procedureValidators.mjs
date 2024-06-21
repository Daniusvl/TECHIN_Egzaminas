import { checkSchema } from "express-validator";
import { isValidMongooseId } from "../shared/commonValidation.mjs";
import { CATEGORIES } from "./procedureModel.mjs";

export const imageExtensions = [".png", ".jpeg", ".jpg"];

const nameValidation = 
{
    isLength: {
        options: { min: 3, max: 20 },
        errorMessage: "Name must be between 3 and 20 characters",
    }
};

const categoryValidation =
{
    custom:{
        options: (v) => {
            if(!CATEGORIES.includes(v)){
                throw new Error("Invalid category");
            }
            return true;
        }
    }
};

const dateValidation = {
    matches:{
        options: /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/,
        errorMessage: "Please provide a valid date format: yyyy-MM-dd hh:MM"
    },
}

export const createValidation = checkSchema({
    name: nameValidation,
    category: categoryValidation,
    date: dateValidation,
    image:{
        custom: {
            options: (value, { req }) => {
                if(!req.files || !req.files.image){
                    throw new Error("image must be provided");
                }
                const { image } = req.files;
                if(image.name && imageExtensions.filter(ext => image.name.includes(ext)).length > 0){
                    return true;
                }
                throw new Error(`image must be a file with specified extensions ${imageExtensions.join(", ")}`);
            }
        }
    }
});

export const updateValidation = checkSchema({
    _id:{
        custom: isValidMongooseId
    },
    name: nameValidation,
    category: categoryValidation,
    date: dateValidation,
    image:{
        custom: {
            options: (value, { req }) => {
                if(!req.files || !req.files.image){
                    return true;
                }
                const { image } = req.files;
                if(image.name && imageExtensions.filter(ext => image.name.includes(ext)).length > 0){
                    return true;
                }
                throw new Error(`image must be a file with specified extensions ${imageExtensions.join(", ")}`);
            }
        }
    }
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
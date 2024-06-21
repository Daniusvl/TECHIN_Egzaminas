import { isValidObjectId } from "mongoose";

export const isValidMongooseId = {
    options: (value) => isValidObjectId(value),
    errorMessage: "Id must be a 24 characters long hex string"
};
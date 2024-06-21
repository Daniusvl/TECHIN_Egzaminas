import { responseMessage } from "../responseMessage.mjs";

const SERVER_SIDE_ERROR = responseMessage("Server side error");

export const errorHandlingMiddleware = (error, req, res, next) => {

    console.error(error);
    
    res.status(500).json(SERVER_SIDE_ERROR);
};
import express from "express";
import { procedureController } from "./procedureController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";
import { createValidation, updateValidation, deleteValidation, getByIdValidation } from "./procedureValidators.mjs";
import { USER } from "../users/userModel.mjs";


const procedureRouter = express.Router();

procedureRouter.post("/", [authMiddleware(ADMIN), createValidation, validationMiddleware], procedureController.createProcedure);
procedureRouter.put("/", [authMiddleware(ADMIN), updateValidation, validationMiddleware], procedureController.updateProcedure);
procedureRouter.delete("/:id", [authMiddleware(ADMIN), deleteValidation, validationMiddleware], procedureController.deleteProcedure);
procedureRouter.get("/get/:id", [authMiddleware(USER), getByIdValidation, validationMiddleware], procedureController.getProcedureById);
procedureRouter.get("/get", [authMiddleware(USER)], procedureController.getProcedures);
export {procedureRouter}
import express from "express";
import { procedureRegistrationController } from "./procedureRegistrationController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";
import { createValidation, updateValidation, approveValidation, deleteValidation, getByIdValidation } from "./procedureRegistrationValidators.mjs";
import { ADMIN, USER } from "../users/userModel.mjs";


const procedureRegistrationRouter = express.Router();

procedureRegistrationRouter.post("/", [authMiddleware(USER), createValidation, validationMiddleware], procedureRegistrationController.createProcedureRegistration);
procedureRegistrationRouter.put("/", [authMiddleware(USER), updateValidation, validationMiddleware], procedureRegistrationController.updateProcedureRegistration);
procedureRegistrationRouter.delete("/:id", [authMiddleware(USER), deleteValidation, validationMiddleware], procedureRegistrationController.deleteProcedureRegistration);
procedureRegistrationRouter.get("/:id", [authMiddleware(USER), getByIdValidation, validationMiddleware], procedureRegistrationController.getProcedureRegistrationById);
procedureRegistrationRouter.get("/my", [authMiddleware(USER)], procedureRegistrationController.getMyProcedureRegistrations);
procedureRegistrationRouter.put("/approve", [authMiddleware(ADMIN), approveValidation, validationMiddleware], procedureRegistrationController.approveProcedureRegistration);
procedureRegistrationRouter.get("/", [authMiddleware(ADMIN)], procedureRegistrationController.getAllProcedureRegistrations);

export {procedureRegistrationRouter}
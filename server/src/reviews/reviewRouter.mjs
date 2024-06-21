import express from "express";
import { reviewController } from "./reviewController.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";
import { createValidation, updateValidation, deleteValidation, getByIdValidation, getProcedureAvgScoreValidation } from "./reviewValidators.mjs";
import { ADMIN, USER } from "../users/userModel.mjs";


const reviewRouter = express.Router();

reviewRouter.post("/", [authMiddleware(USER), createValidation, validationMiddleware], reviewController.createReview);
reviewRouter.put("/", [authMiddleware(USER), updateValidation, validationMiddleware], reviewController.updateReview);
reviewRouter.delete("/:id", [authMiddleware(USER), deleteValidation, validationMiddleware], reviewController.deleteReview);
reviewRouter.get("/:id", [authMiddleware(USER), getByIdValidation, validationMiddleware], reviewController.getReviewById);
reviewRouter.get("/avgScore/:procedureId", [authMiddleware(USER, ADMIN), getProcedureAvgScoreValidation, validationMiddleware], reviewController.getProcedureAvgScore);


export {reviewRouter}
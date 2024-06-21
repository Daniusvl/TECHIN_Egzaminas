import { Schema, model, Types } from "mongoose";

const reviewModel = Schema(
    {
        userId: {type: Types.ObjectId, ref: "User", required: true},
        procedureRegistrationId: {type: Types.ObjectId, ref: "ProcedureRegistration", required: true},
        score: { type: Number, required: true },
    }
);

export default model("Review", reviewModel, "Reviews");
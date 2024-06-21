import { Schema, model, Types } from "mongoose";

const reviewModel = Schema(
    {
        procedureRegistrationId: {type: Types.ObjectId, unique: true, ref: "ProcedureRegistration", required: true},
        score: { type: Number, required: true },
    },
    { 
        versionKey: false 
    }
);

export default model("Review", reviewModel, "Reviews");
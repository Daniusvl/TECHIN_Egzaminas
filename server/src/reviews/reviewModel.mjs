import { Schema, model, Types } from "mongoose";

const reviewModel = Schema(
    {
        userId: {type: Types.ObjectId, ref: "User", required: true},
        procedureId: {type: Types.ObjectId, ref: "Procedure", required: true},
        Score: { type: Number, required: true },
    }
);

export default model("Review", reviewModel, "Reviews");
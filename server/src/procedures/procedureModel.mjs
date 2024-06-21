import { Schema, model } from "mongoose";

export const CATEGORIES = [
    "1",
    "2"
]

export const C1 = CATEGORIES[0];
export const C2 = CATEGORIES[1];

const procedureModel = Schema(
    {
        name: { type: String, required: true },
        category: { type: String, enum: CATEGORIES, required: true, default: C1 },
        date: { type: String, required: true },
        imgPath: { type: String, required: true },
    },
    { 
        versionKey: false 
    }
);

export default model("Procedure", procedureModel, "Procedures");
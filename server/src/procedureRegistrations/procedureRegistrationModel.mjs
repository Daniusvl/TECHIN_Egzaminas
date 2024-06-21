import { Schema, model, Types } from "mongoose";

const procedureRegistrationModel = Schema(
    {
        userId: {type: Types.ObjectId, ref: "User", required: true},
        procedureId: {type: Types.ObjectId, ref: "Procedure", required: true},
        isApproved: { type: Boolean, required: true, default: false }
    },
    { 
        versionKey: false 
    }
);

export default model("ProcedureRegistration", procedureRegistrationModel, "ProcedureRegistrations");
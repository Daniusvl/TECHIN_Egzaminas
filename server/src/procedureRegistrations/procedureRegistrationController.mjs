import procedureRegistration from "./procedureRegistration.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";

const NOT_FOUND = responseMessage("procedure registration not found");

export const procedureRegistrationController = {
    createProcedureRegistration: async (req, res, next) => {
        try {
            const { procedureId } = req.body;
            const newProcedureRegistration = {
                procedureId, userId: req.user._id, isApproved: false
            }

            const result = await procedureRegistration.create(newProcedureRegistration);

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    updateProcedureRegistration: async (req, res, next) => {
        try {
            const { _id, procedureId } = req.body;

            const procedureRegistration = await procedureRegistration.findById(_id);
            if(!procedureRegistration){
                return res.status(404).json(NOT_FOUND);
            }

            procedureRegistration.procedureId = procedureId;
            await procedureRegistration.save();

            return res.status(200).json(procedureRegistration);
        } catch (error) {
            next(error);
        }
    },

    approveProcedureRegistration: async (req, res, next) => {
        try {
            const procedureRegistration = await procedureRegistration.findById(req.params.id);
            if(!procedureRegistration){
                return res.status(404).json(NOT_FOUND);
            }

            procedureRegistration.isApproved = true;
            await procedureRegistration.save();

            return res.status(200).json(procedureRegistration);
        } catch (error) {
            next(error);
        }
    },

    deleteProcedureRegistration: async (req, res, next) => {
        try {
            const procedureRegistration = await procedureRegistration.findOneAndDelete({_id: req.params.id});
            if(!procedureRegistration){
                return res.status(404).json(NOT_FOUND);
            }

            return res.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    getProcedureById: async (req, res, next) => {
        try {
            const procedure = await procedureModel.findById(req.params.id);

            if(!procedure){ 
                return res.status(404).json(NOT_FOUND);
            }

            return res.status(200).json(procedure);
        } catch (error) {
            next(error);
        }
    },

    getAllProcedureRegistrations: async (req, res, next) => {
        try {
            const procedureRegistrations = await procedureRegistration.find();
            return res.status(200).json(procedureRegistrations);
        }
        catch (error) {
            next(error);
        }
    }
};
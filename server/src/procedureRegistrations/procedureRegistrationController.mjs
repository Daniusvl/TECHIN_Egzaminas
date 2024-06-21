import procedureRegistrationModel from "./procedureRegistrationModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";

const NOT_FOUND = responseMessage("procedure registration not found");

const ACCESS_DENIED = responseMessage("access denied");

export const procedureRegistrationController = {
    createProcedureRegistration: async (req, res, next) => {
        try {
            const { procedureId } = req.body;
            const newProcedureRegistration = {
                procedureId, userId: req.user._id, isApproved: false
            }

            const result = await procedureRegistrationModel.create(newProcedureRegistration);

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    updateProcedureRegistration: async (req, res, next) => {
        try {
            const { _id, procedureId } = req.body;

            const procedureRegistration = await procedureRegistrationModel.findById(_id);
            if(!procedureRegistration){
                return res.status(404).json(NOT_FOUND);
            }

            if(!procedureRegistration.userId.equals(req.user._id)){
                return res.status(403).json(ACCESS_DENIED);
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
            const procedureRegistration = await procedureRegistrationModel.findById(req.params.id);
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
            const procedureRegistration = await procedureRegistrationModel.findOneAndDelete({_id: req.params.id});
            if(!procedureRegistration){
                return res.status(404).json(NOT_FOUND);
            }

            if(!procedureRegistration.userId.equals(req.user._id)){
                return res.status(403).json(ACCESS_DENIED);
            }

            return res.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    getProcedureRegistrationById: async (req, res, next) => {
        try {
            const procedure = await procedureRegistrationModel.findById(req.params.id);

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
            const procedureRegistrations = await procedureRegistrationModel.find();
            return res.status(200).json(procedureRegistrations);
        }
        catch (error) {
            next(error);
        }
    },

    getMyProcedureRegistrations: async (req, res, next) => {
        try {
            const procedureRegistrations = await procedureRegistrationModel.find({userId: req.user._id});
            return res.status(200).json(procedureRegistrations);
        }
        catch (error) {
            next(error);
        }
    }
};
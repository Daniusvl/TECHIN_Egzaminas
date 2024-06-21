import reviewModel from "./reviewModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";

const NOT_FOUND = responseMessage("procedure not found");

export const reviewController = {
    createProcedure: async (req, res, next) => {
        try {
            const {name, category, date, img} = req.body;
            const newProcedure = {
                name, category, date, img
            }

            const result =await procedureModel.create(newProcedure);
            

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    updateProcedure: async (req, res, next) => {
        try {
            const {_id, name, category, date, img} = req.body;

            const procedure = await procedureModel.findById(_id);
            if(!procedure){
                return res.status(404).json(NOT_FOUND);
            }

            procedure.name = name;
            procedure.category = category;
            procedure.date = date;
            procedure.img = img;
            await procedure.save();

            return res.status(200).json({token});
        } catch (error) {
            next(error);
        }
    },

    deleteProcedure: async (req, res, next) => {
        try {
            const procedure = await procedureModel.findOneAndDelete({_id: id});
            if(!procedure){
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

    getAllProcedures: async (req, res, next) => {
        try {
            const procedures = await procedureModel.find();
            return res.status(200).json(procedures);
        }
        catch (error) {
            next(error);
        }
    }
};
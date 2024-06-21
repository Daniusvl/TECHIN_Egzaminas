import procedureModel from "./procedureModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";
import { writeFile, updateFile, deleteFile } from "../shared/imageHandler.mjs";
const NOT_FOUND = responseMessage("procedure not found");

const FAILED_TO_UPLOAD_FILE = responseMessage("failed to upload file");

export const procedureController = {
    createProcedure: async (req, res, next) => {
        try {
            const {name, category, date} = req.body;
            const newProcedure = {
                name, category, date
            }

            const {image} = req.files;
        
        let imgPath;
        try {
            imgPath = await writeFile(image);
        } catch (error) {
            return res.status(500).json(FAILED_TO_UPLOAD_FILE);
        }
        newProcedure.imgPath = imgPath;
            const result = await procedureModel.create(newProcedure);
            

            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    },

    updateProcedure: async (req, res, next) => {
        try {
            const {_id, name, category, date} = req.body;

            const procedure = await procedureModel.findById(_id);
            if(!procedure){
                return res.status(404).json(NOT_FOUND);
            }

            let imgPath = procedure.imgPath;

        if(req.files && req.files.image){
            const {image} = req.files;
            try {
                imgPath = await updateFile(image, procedure.imgPath);
            } catch (error) {
                return res.status(500).json(FAILED_TO_UPLOAD_FILE);
            }
        }

            procedure.name = name;
            procedure.category = category;
            procedure.date = date;
            procedure.imgPath = imgPath;
            await procedure.save();

            return res.status(200).json(procedure);
        } catch (error) {
            next(error);
        }
    },

    deleteProcedure: async (req, res, next) => {
        try {
            const procedure = await procedureModel.findOneAndDelete({_id: req.params.id});
            if(!procedure){
                return res.status(404).json(NOT_FOUND);
            }

            await deleteFile(procedure.imgPath);

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
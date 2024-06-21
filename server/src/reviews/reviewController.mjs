import reviewModel from "./reviewModel.mjs";
import procedureRegistrationModel from "../procedureRegistrations/procedureRegistrationModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";

const NOT_FOUND = responseMessage("review not found");

const REGISTRATION_NOT_FOUND = responseMessage("procedure registration not found");

const ACCESS_DENIED = responseMessage("access denied");

const ALREADY_EXISTS = responseMessage("review already exists");

export const reviewController = {
    createReview: async (req, res, next) => {
        try {
            const {procedureRegistrationId, score} = req.body;

            const procedureRegistration = await procedureRegistrationModel.findById(procedureRegistrationId);
            if(!procedureRegistration){
                return res.status(404).json(REGISTRATION_NOT_FOUND);
            }

            if(!procedureRegistration.userId.equals(req.user._id)){
                return res.status(403).json(ACCESS_DENIED);
            }

            const review = await reviewModel.findOne({procedureRegistrationId});
            if(review){
                return res.status(409).json(ALREADY_EXISTS);
            }

            const newReview = {
                score,
                procedureRegistrationId
            }

            const result = await reviewModel.create(newReview);

            return res.status(201).json(result);

        } catch (error) {
            next(error);
        }
    },

    updateReview: async (req, res, next) => {
        try {
            const {_id, score} = req.body;

            const review = await reviewModel.findById(_id);

            const procedureRegistration = await procedureRegistrationModel.findById(review.procedureRegistrationId);
            if(!procedureRegistration.userId.equals(req.user._id)){
                return res.status(403).json(ACCESS_DENIED);
            }

            review.score = score;
            await review.save();
            
            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const review = await reviewModel.findById(req.params.id);
        
            if(!review){
                return res.status(404).json(NOT_FOUND);
            }

            const procedureRegistration = await procedureRegistrationModel.findById(review.procedureRegistrationId);
            if(!procedureRegistration.userId.equals(req.user._id)){
                return res.status(403).json(ACCESS_DENIED);
            }

            await review.remove();

            return res.status(204).json();
        } catch (error) {
            next(error);
        }
    },

    getReviewById: async (req, res, next) => {
        try {
            const review = await reviewModel.findById(req.params.id);
            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    getMyReviews: async (req, res, next) => {
        try {
            const reviews = await reviewModel.find({userId: req.user._id});
            return res.status(200).json(reviews);
        }
        catch (error) {
            next(error);
        }
    },

    getProcedureAvgScore: async (req, res, next) => {
        try {
            const {procedureId} = req.params;
            const reviews = await reviewModel.aggregate([
                {
                    $lookup: {
                        from: "ProcedureRegistrations",
                        localField: "procedureRegistrationId",
                        foreignField: "_id",
                        as: "procedureRegistration",
                        pipeline: [
                            {
                                $match: {
                                    procedureId
                                }
                            }
                        ]
                    }
                },
                {
                    $group: {
                        _id: null,
                        avgScore: {
                            $avg: "$score"
                        }
                    }
                }
            ]);

            return res.status(200).json(reviews[0].avgScore);
        }
        catch (error) {
            next(error);
        }
    },
};
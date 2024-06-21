import reviewModel from "./reviewModel.mjs";
import procedureRegistrationModel from "../procedureRegistrations/procedureRegistrationModel.mjs";
import { responseMessage } from "../shared/responseMessage.mjs";

const NOT_FOUND = responseMessage("review not found");

export const reviewController = {
    createReview: async (req, res, next) => {
        try {
            const {procedureRegistrationId, score} = req.body;

            const newReview = {
                userId: req.user._id, 
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
            review.score = score;
            await review.save();
            
            return res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    },

    deleteReview: async (req, res, next) => {
        try {
            const review = await reviewModel.findOneAndDelete({_id: req.params.id});
            
            if(!review){
                return res.status(404).json(NOT_FOUND);
            }

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
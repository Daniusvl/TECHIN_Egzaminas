import express from "express"

import { userRouter } from "./users/userRouter.mjs";

const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/procedures", procedureRouter);

export default mainRouter;
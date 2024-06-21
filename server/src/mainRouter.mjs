import express from "express"

import { userRouter } from "./users/userRouter.mjs";
import { procedureRouter } from "./procedures/procedureRouter.mjs";
import { procedureRegistrationRouter } from "./procedureRegistrations/procedureRegistrationRouter.mjs";
import { reviewRouter } from "./reviews/reviewRouter.mjs";

const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/procedures", procedureRouter);
mainRouter.use("/procedureRegistrations", procedureRegistrationRouter);
mainRouter.use("/reviews", reviewRouter);

export default mainRouter;
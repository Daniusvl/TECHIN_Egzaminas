import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import mainRouter from "./src/mainRouter.mjs";

const app = express();

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING);

        app.use(cors());

        app.use(express.json());

        app.use(mainRouter);

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running and listening on port ${port}.`);
        });

    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

startServer();
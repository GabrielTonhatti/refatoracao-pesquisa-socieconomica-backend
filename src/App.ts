import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import logger from "./config/logger";

class App {
    private readonly _app: Application;

    public constructor() {
        this._app = express();
        this.database();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
    }

    private database(): void {
        logger.info("Connecting to database...");
        mongoose
            .connect(<string>process.env.MONGO_URL)
            .then((): void => logger.info("MongoDB connected ✅"))
            .catch((error: Error): void => {
                logger.error("Error connecting to MongoDB ❌");
                logger.error(error);
                logger.info("MongoDB disconnected");
            });
    }

    private routes(): void {
        this._app.use(routes);
    }

    public get app(): Application {
        return this._app;
    }
}

export default new App().app;

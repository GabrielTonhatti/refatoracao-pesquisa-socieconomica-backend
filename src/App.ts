import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import logger from "./config/logger";
import { Logger } from "pino";

class App {
  private readonly _app: Application;
  private readonly log: Logger;

  public constructor() {
    this._app = express();
    this.log = logger;
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
    this.log.info("Connecting to database...");
    mongoose
      .connect(<string>process.env.MONGO_URL)
      .then((): void => this.log.info("MongoDB connected ✅"))
      .catch((error: Error): void => {
        this.log.error("Error connecting to MongoDB ❌");
        this.log.error(error);
        this.log.info("MongoDB disconnected");
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

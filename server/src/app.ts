import cors from "cors";
import express from "express";
import { env } from "process";
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import { Action, useExpressServer } from "routing-controllers";
import { AuthController, TodosController } from "./controllers";

export class App {

    app: express.Express

    constructor() {
        this.app = express();
    }

    configure() {
        this.configureMiddleware()
        this.configureRoutes()
    }

    async start() {
        try {
            await this.connectDB()
            this.app.listen(env.PORT, () => console.log(`SERVER START AT PORT ${env.PORT}`))
        } catch (e) {
            console.log(e);
        }
    }

    private configureMiddleware() {
        this.app.use(express.json());
        this.app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
        this.app.use(cookieParser())
    }

    private configureRoutes() {
        useExpressServer(this.app, {
            currentUserChecker: (action: Action) => {
                return action.request.user ?? undefined
            },
            routePrefix: '/api/',
            controllers: [
                TodosController,
                AuthController
            ]
        });
    }

    private async connectDB() {
        await mongoose.connect(env.CONNECTION_STRING)
    }
}
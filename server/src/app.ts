import { Action, useExpressServer } from 'routing-controllers';
import express from 'express';
import { env } from 'process';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authMiddleware,errorHandlerMiddleware } from './middlewares';
import { AuthController,TodosController } from './controllers';

config()

const app: express.Express = express();

app.use(express.json());
app.use(cors({origin:env.CLIENT_URL,credentials:true}));
app.use(cookieParser())

app.use('/api/',authMiddleware)

useExpressServer(app, {
  currentUserChecker: async (action: Action) => {
    return action.request.user ?? undefined;
  },
  routePrefix:'/api/',
  controllers: [
    TodosController,
    AuthController
  ]
});

app.use(errorHandlerMiddleware)

main()

async function main() {
  try {
    await mongoose.connect(env.CONNECTION_STRING);
    app.listen(env.PORT, () => console.log(`SERVER START AT PORT ${env.PORT}`))
  } catch (e) {
    console.log(e);
  }
}


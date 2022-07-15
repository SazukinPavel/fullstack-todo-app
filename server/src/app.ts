import { useExpressServer } from 'routing-controllers';
import { TodosController } from './controllers/todos.contoller';
import express from 'express';
import { env } from 'process';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthController } from './controllers/auth.controller';
import { checkAuthMiddleware } from './middlewares/checkAuth.middleware';

config()

const app: express.Express = express();


app.use(express.json());
app.use(cors({origin:env.CLIENT_URL,credentials:true}));
app.use(cookieParser())

app.use('/api/todos',checkAuthMiddleware)


useExpressServer(app, {
  controllers: [
    TodosController,
    AuthController
  ]
});


main()

async function main() {
  try {
    await mongoose.connect(env.CONNECTION_STRING);
    app.listen(env.PORT, () => console.log(`SERVER START AT PORT ${env.PORT}`))
  } catch (e) {
    console.log(e);
  }
}


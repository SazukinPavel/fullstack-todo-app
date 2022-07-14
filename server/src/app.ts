import { useExpressServer } from 'routing-controllers';
import { TodosController } from './controllers/todos.contoller';
import express from 'express';
import { env } from 'process';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthController } from './controllers/auth.controller';
import { verify } from 'jsonwebtoken';
import IUser from './models/User';
import { User } from './schemas/User.schema';

config()

const app: express.Express = express();

app.use(async (req, res, next) => {
  const cookie = req.cookies
  console.log(cookie);
  if (cookie && 'auth' in cookie) {
    console.log('in');
    const token = cookie.auth
    const user = verify(token, env.JWT_KEY) as IUser
    if (!user) {
      next()
    }
    const realUser = await User.findById(user.id)
    if (realUser) {
      req.body.user = user
    }
  }
  next()
})

app.use('/todos', (req, res, next) => {
  console.log('work');
  if (!req.body.user) {
    res.status(403).json('You not authorize')
  }
  next()
})

app.use(express.json());
app.use(cors());
app.use(cookieParser())

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


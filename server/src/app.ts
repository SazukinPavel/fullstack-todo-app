import { useExpressServer } from 'routing-controllers';
import { TodosController } from './controllers/TodosContoller';
import express from 'express';
import { env } from 'process';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config()


const app: express.Express = express();
app.use(express.json());
useExpressServer(app, {
  controllers: [TodosController]
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


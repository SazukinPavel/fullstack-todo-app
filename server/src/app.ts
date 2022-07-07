import { createExpressServer } from 'routing-controllers';
import { TodosController } from './controllers/TodosContoller';
import { Express } from 'express';
import { env } from 'process';
import { config } from 'dotenv';

config()

const app:Express = createExpressServer({
  controllers: [TodosController], 
});

app.listen(env.PORT,()=>console.log(`SERVER START AT PORT ${env.PORT}`))

import { Controller, Get} from 'routing-controllers';
import 'reflect-metadata';

@Controller()
export class TodosController {
    @Get('/todos/')
    getOne() {
        return 'Hello world';
    }
}
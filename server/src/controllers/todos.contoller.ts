import { Body, Controller, Delete, Get, Param, Post, Put, Req} from 'routing-controllers';
import 'reflect-metadata';
import { Todo } from '../schemas/Todo.schema';
import { AddTodoDto } from './dto/AddTodo.dto';
import ITodo from '../models/Todo';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';

@Controller('/api/todos/')
export class TodosController {
    @Get()
    async getAll() {
        const todos:Array<ITodo>=await Todo.find<ITodo>()
        return JSON.stringify(todos)
    }

    @Get(':id')
    async getById(@Param('id') id:string){
        const todo:ITodo=await Todo.findById(id).exec()
        return JSON.stringify(todo)
    }

    @Post()
    async addTodo(@Body() addTodoDto:AddTodoDto){
        const todo=new Todo({...addTodoDto})
        const savedTodo=await todo.save()
        return JSON.stringify(savedTodo)
    }

    @Put(':id')
    async updateTodo(@Param('id') id:string,@Body() updateTodoDto:UpdateTodoDto){
        const todo=await Todo.findByIdAndUpdate(id,{...updateTodoDto})
        return JSON.stringify({...updateTodoDto,_id:id})
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id:string){
        const deleteTodo=await Todo.findByIdAndDelete(id)
        return JSON.stringify(deleteTodo)        
    }
}
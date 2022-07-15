import { Body, Controller, CurrentUser, Delete, Get, HttpError, Param, Post, Put, Req} from 'routing-controllers';
import 'reflect-metadata';
import { Todo } from '../schemas/Todo.schema';
import { AddTodoDto } from './dto/AddTodo.dto';
import ITodo from '../models/Todo';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import IUser from '../models/User';

@Controller('todos/')
export class TodosController {
    @Get()
    async getUserTodos(@CurrentUser({required:true}) user:IUser) {
        const todos:Array<ITodo>=await Todo.find<ITodo>({owner:user._id})
        return JSON.stringify(todos)
    }

    @Get(':id')
    async getById(@CurrentUser({required:true}) user:IUser,@Param('id') id:string){
        const todo:ITodo=await Todo.findById(id)
        this.checkIsUserTodo(user,todo)
        return JSON.stringify(todo)
    }

    @Post()
    async addTodoToUser(@CurrentUser({required:true}) user:IUser,@Body() addTodoDto:AddTodoDto){
        console.log(user);
        
        const todo=new Todo({...addTodoDto,owner:user._id})
        console.log(todo);
        
        const savedTodo=await todo.save()
        return JSON.stringify(savedTodo)
    }

    @Put(':id')
    async updateTodo(@CurrentUser({required:true}) user:IUser,@Param('id') id:string,@Body() updateTodoDto:UpdateTodoDto){
        const todo=await Todo.findById(id)
        this.checkIsUserTodo(user,todo)
        await Todo.findByIdAndUpdate(id,{...updateTodoDto})
        return JSON.stringify({...updateTodoDto,_id:id})
    }

    @Delete(':id')
    async deleteTodo(@CurrentUser({required:true}) user:IUser,@Param('id') id:string){
        const todo=await Todo.findById(id)
        this.checkIsUserTodo(user,todo)
        await Todo.findByIdAndDelete(id)
        return JSON.stringify(todo)        
    }

    private checkIsUserTodo(user:IUser,todo:ITodo){
        if(user._id.toString()!=todo.owner.toString()){
            throw new HttpError(404,' ')
        }
    }
}
import { Body, Controller, CurrentUser, Delete, ForbiddenError, Get, JsonController, Param, Post, Put, UseBefore } from 'routing-controllers';
import 'reflect-metadata';
import Todo from '../schemas/Todo.schema';
import { AddTodoDto } from './dto/AddTodo.dto';
import ITodo from '../models/Todo';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import IUser from '../models/User';
import { AuthMiddleware } from '../middlewares';

@JsonController('todos/')
@UseBefore(AuthMiddleware)
export class TodosController {
    @Get()
    async getUserTodos(@CurrentUser({ required: true }) user: IUser) {
        const todos: Array<ITodo> = await Todo.find<ITodo>({ owner: user._id })
        return todos
    }

    @Get(':id')
    async getById(@CurrentUser({ required: true }) user: IUser, @Param('id') id: string) {
        const todo: ITodo = await Todo.findById(id)
        this.throwIfNotExist(todo)
        this.checkIsUserTodo(user, todo)
        return todo
    }

    @Post()
    async addTodoToUser(@CurrentUser({ required: true }) user: IUser, @Body() addTodoDto: AddTodoDto) {
        const todo = new Todo({ ...addTodoDto, owner: user._id })
        const savedTodo = await todo.save()
        return savedTodo
    }

    @Put(':id')
    async updateTodo(@CurrentUser({ required: true }) user: IUser, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        const todo = await Todo.findById(id)
        this.throwIfNotExist(todo)
        this.checkIsUserTodo(user, todo)
        await Todo.findByIdAndUpdate(id, { ...updateTodoDto })
        return { ...updateTodoDto, _id: id }
    }

    @Delete(':id')
    async deleteTodo(@CurrentUser({ required: true }) user: IUser, @Param('id') id: string) {
        const todo = await Todo.findById(id)
        this.throwIfNotExist(todo)
        this.checkIsUserTodo(user, todo)
        await Todo.findByIdAndDelete(id)
        return todo
    }

    private checkIsUserTodo(user: IUser, todo: ITodo) {
        if (user._id.toString() != todo.owner.toString()) {
            throw new ForbiddenError('Вы не владеете этой заметкой')
        }
    }

    private throwIfNotExist(todo: ITodo) {
        if (!todo) {
            throw new ForbiddenError('Такой задачи нет')
        }
    }
}
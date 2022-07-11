import axios from "axios";

export default class TodoService {
    static async fetchTodo(id) {
        try {
            return (await axios.get(`http://localhost:4200/todos/${id}`)).data
        } catch (e) {
            console.log(`some error with fetch todo((( Error:${e}`);
        }
    }

    static async fetchTodos() {
        try {
            return (await axios.get('http://localhost:4200/todos')).data
        } catch (e) {
            console.log(`Error with fetch todo((( Error:${e}`);
        }
    }

    static async updateTodo(updateTodoDto) {
        console.log(updateTodoDto);
        try {
            return (await axios.put(`http://localhost:4200/todos/${updateTodoDto._id}`, { ...updateTodoDto, completed: !updateTodoDto.completed })).data
        } catch (e) {
            console.log(`Cant update todo((( Error:${e}`);
        }
    }

    static async deleteTodo(id) {
        try {
            return await axios.delete(`http://localhost:4200/todos/${id}`)
        } catch (e) {
            console.log(`Cant delete todo((( Error:${e}`);
        }
    }

    static async addTodo(todo) {
        try {
            return (await axios.post('http://localhost:4200/todos', todo)).data
        } catch (e) {
            console.log(`Error with add todo((( Error:${e}`);
        }
    }
}
import axios from "@/api/axios";

export default class TodoService {
    static async fetchTodo(id) {
        try {
            return (await axios.get(`/todos/${id}`)).data
        } catch (e) {
            console.log(`some error with fetch todo((( Error:${e}`);
        }
    }

    static async fetchTodos() {
        try {
            return (await axios.get('/todos')).data
        } catch (e) {
            console.log(`Error with fetch todo((( Error:${e}`);
        }
    }

    static async updateTodo(updateTodoDto) {
        try {
            return (await axios.put(`/todos/${updateTodoDto._id}`, updateTodoDto)).data
        } catch (e) {
            console.log(`Cant update todo((( Error:${e}`);
        }
    }

    static async deleteTodo(id) {
        try {
            return await axios.delete(`/todos/${id}`)
        } catch (e) {
            console.log(`Cant delete todo((( Error:${e}`);
        }
    }

    static async addTodo(todo) {
        try {
            return (await axios.post('/todos', todo)).data
        } catch (e) {
            console.log(`Error with add todo((( Error:${e}`);
        }
    }
}
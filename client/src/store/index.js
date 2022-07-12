import TodoService from "@/services/TodoService";
import { createStore } from "vuex";

export const store = createStore({
    state: {
        todos: [],
        currentTodo: {}
    },
    getters: {},
    actions: {
        async fetchTodo(ctx, id) {
            const todo = await TodoService.fetchTodo(id)
            ctx.commit('setCurrentTodo', todo)
        },
        async fetchTodos(ctx) {
            const todos = await TodoService.fetchTodos()
            ctx.commit('setTodos', todos)
        },
        async updateTodo(ctx, updateTodoDto) {
            const updateTodo = await TodoService.updateTodo(updateTodoDto)
            ctx.commit('updateTodos', updateTodo)
        },
        async deleteTodo(ctx, id) {
            await TodoService.deleteTodo(id)
            ctx.commit('removeFromTodos', id)
        },
        async addTodo(ctx, todo) {
            const newTodo = await TodoService.addTodo(todo)
            ctx.commit('addTodo', newTodo)
        }
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos
        },
        setCurrentTodo(state, todo) {
            state.currentTodo = todo
        },
        removeFromTodos(state, todoId) {
            state.todos = state.todos.filter(t => t._id !== todoId)
        },
        updateTodos(state, todo) {
            state.todos = state.todos.map(t => {
                if (t._id !== todo._id) {
                    return todo
                }
                return t
            })
        },
        addTodo(state, todo) {
            state.todos = { ...state.todos, todo }
        }
    }
})
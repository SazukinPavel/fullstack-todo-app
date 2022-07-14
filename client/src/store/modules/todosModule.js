import TodoService from "@/services/TodoService";

export const todosModule = {
    state: {
        todos: [],
    },
    getters: {
        todos(state){
            return state.todos ?? []
        }
    },
    actions: {
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
        },
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos
        },
        removeFromTodos(state, todoId) {
            state.todos = state.todos.filter(t => t._id !== todoId)
        },
        updateTodos(state, todo) {
            state.todos = state.todos.map(t => {
                if (t._id === todo._id) {
                    return todo
                }
                return t
            })
        },
        addTodo(state, todo) {
            state.todos.push(todo)
        },
    }
}
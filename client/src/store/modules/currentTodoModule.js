import TodoService from "@/services/TodoService";

export const currentTodoModule = {
    state: {
        currentTodo: {}
    },
    getters: {
        currentTodo(state){
            return state.currentTodo
        }
    },
    actions: {
        async fetchCurrentTodo(ctx, id) {
            const todo = await TodoService.fetchTodo(id)
            ctx.commit('setCurrentTodo', todo)
        },
        async deleteCurrentTodo(ctx){
            await TodoService.deleteTodo(ctx.state.currentTodo._id)
            ctx.commit('resetCurrentTodo')
        },
        async updateCurrentTodo(ctx,updatedTodo){
            const updateTodo = await TodoService.updateTodo(updatedTodo)
            ctx.commit('setCurrentTodo', updateTodo)
        },
        resetCurrentTodo(ctx){
            ctx.commit('resetCurrentTodo')
        }
    },
    mutations: {
        resetCurrentTodo(state){
            state.currentTodo={}
        },
        setCurrentTodo(state, todo) {
            state.currentTodo = todo
        }
    }
}
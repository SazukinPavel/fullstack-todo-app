import AuthService from "@/services/AuthServce"

export const authModule = {
    state: {
        isAuth: Boolean,
        username:String
    },
    getters: {
        isAuth(state){
            return state.isAuth
        },
        username(state){
            return state.username
        }
    },
    actions: {
        // async tryAuth(ctx,action){
            
        // },
        async register(ctx,authDto){
            const user=await AuthService.register(authDto)
            ctx.commit('authUser',user.username)
        },
        async login(ctx,authDto){
            const user=await AuthService.login(authDto)
            ctx.commit('authUser',user.username)
        },
    },
    mutations: {
        authUser(state,username){
            state.isAuth=true
            state.username=username
        },
    }
}
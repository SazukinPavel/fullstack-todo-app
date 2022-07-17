import AuthService from "@/services/AuthServce"

export const authModule = {
    state: {
        isAuth: Boolean,
        username:String,
        accessToken:String
    },
    getters: {
        isAuth(state){
            return state.isAuth
        },
        username(state){
            return state.username
        },
        accessToken(state){
            return state.accessToken
        }
    },
    actions: {
        async tryAuth(ctx){
            const authInfo=await AuthService.getAuthorizeInfo()
            if(authInfo){
                ctx.commit('authUser',authInfo)
            }
        },
        async register(ctx,authDto){
            const authInfo=await AuthService.register(authDto)
            ctx.commit('authUser',authInfo)
        },
        async login(ctx,authDto){
            const authInfo=await AuthService.login(authDto)
            ctx.commit('authUser',authInfo)
        },
    },
    mutations: {
        authUser(state,authInfo){
            state.isAuth=true
            state.username=authInfo.user.username
            state.accessToken=authInfo.accessToken
        },
    }
}
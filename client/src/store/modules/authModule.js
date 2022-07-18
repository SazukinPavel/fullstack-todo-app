import AuthService from "@/services/AuthServce"

export const authModule = {
    state:()=>({
        isAuth: false,
        username:'',
        accessToken:''
    }),
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
            console.log(authInfo);
            if(authInfo){
                ctx.commit('authUser',authInfo)
            }
        },
        async register(ctx,authDto){
            const authInfo=await AuthService.register(authDto)
            if(authInfo){
                ctx.commit('authUser',authInfo)
            }
            ctx.commit('authUser',authInfo)
        },
        async login(ctx,authDto){
            const authInfo=await AuthService.login(authDto)
            if(authInfo){
                ctx.commit('authUser',authInfo)
            }
        },
        async logout(ctx){
            await AuthService.logout()
            ctx.commit('logout')
        },
    },
    mutations: {
        authUser(state,authInfo){
            console.log(authInfo.user.username);
            console.log(authInfo.accessToken);
            state.isAuth=true
            state.username=authInfo.user.username
            state.accessToken=authInfo.accessToken
        },
        logout(state){
            state.accessToken=null
            state.isAuth=false
            state.username=null
        }
    }
}
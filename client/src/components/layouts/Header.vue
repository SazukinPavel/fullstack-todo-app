<template>
    <div class="header">
        <div class="logo">
            <p @click="toHome">Fullstack Todo App</p>
        </div>
        <div v-if="isAuth" class="header__content">
            <p class="header__username">{{ this.username}}</p>
            <my-flat-button @click="logoutUser">Logout</my-flat-button>
        </div>
        <div v-else class="header__content">
            <my-flat-button @click="toRegister">Register</my-flat-button>
            <my-flat-button @click="toLogin">Login</my-flat-button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: mapGetters({
        isAuth: 'isAuth',
        username: 'username'
    }),
    methods: {
        ...mapActions(['logout']),
        async logoutUser(){
            await this.logout()
            this.$router.push({ path: `/` })
        },
        toRegister(){
            this.$router.push({ path: `register`})
        },
        toLogin(){
            this.$router.push({ path: `login` })
        },
        toHome(){
            this.$router.push({ path: `/` })

        }
    },
    name: 'my-header'
}
</script>
<style scoped>
.header {
    padding: 20px 20px;
    display: flex;
    justify-content: space-between;
    background-color: teal;
}

.header .logo p {
    color: aliceblue;
    font-size: 42px;
    margin: auto 0;
}

.header__content {
    display: flex;
    justify-content: center;
}

p.header__username {
    color: aliceblue;
    font-size: 32px;
    margin: auto;
}

.header span {
    margin: auto 30px;
    padding: 5px;
}
</style>
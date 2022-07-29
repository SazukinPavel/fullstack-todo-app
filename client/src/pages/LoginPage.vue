<template>
  <div>
    <my-title>Login</my-title>
    <form @submit.prevent class="form">
      <form-control text="Username" v-model="authDto.username" />
      <form-control type="password" text="Password" v-model="authDto.password" />
      <div class="buttons">
        <my-button @click="back">Back</my-button>
        <my-button @click="toRegiter">To register</my-button>
        <my-button @click="loginClick">Login</my-button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      authDto: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(['login']),
    back() {
      this.$router.back()
    },
    async loginClick() {
      if (this.authDto.username.length >= 8 && this.authDto.password.length >= 8) {
        await this.login(this.authDto)
        this.$router.push({path:'todos'});
      }
    },
    toRegiter() {
      this.$router.push({ path: 'register' })
    }
  },
  name: "login-page",
};
</script>
<style scoped>
.form {
  width: 720px;
  margin: auto;
  padding: 20px;
}
</style>
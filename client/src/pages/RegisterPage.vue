<template>
  <div>
    <my-title>Registration</my-title>
    <form @submit.prevent class="form">
      <form-control text="Username" v-model="authDto.username" />
      <form-control
        type="password"
        text="Password"
        v-model="authDto.password"
      />
      <form-control type="password" text="Repeat password" v-model="repeatedPassword" />
      <div class="buttons">
        <my-button @click="back">Back</my-button>
        <my-button @click="toLogin">To login</my-button>
        <my-button @click="registr">Registr</my-button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions} from 'vuex';
export default {
  data() {
    return {
      authDto: {
        username: "",
        password: "",
      },
      repeatedPassword:''
    };
  },
  methods: {
    ...mapActions(['register']),
    back() {
      this.$router.back();
    },
    async registr() {
      if(this.authDto.username.length>=8 && this.authDto.password.length>=8 && this.repeatedPassword===this.authDto.password){
        await this.register(this.authDto)
        this.$router.push({path:'todos'});
      }
    },
    toLogin(){
      this.$router.push({path:'login'});
    }
  },
  name: "register-page",
};
</script>
<style scoped>
.form {
  width: 720px;
  margin: auto;
  padding: 20px;
}
</style>
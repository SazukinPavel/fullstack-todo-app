<template>
  <div>
    <my-title>Login</my-title>
    <form class="form">
      <form-control text="Username" v-model="authDto.username" />
      <form-control
        type="password"
        text="Password"
        v-model="authDto.password"
      />
      <div class="buttons">
        <my-button @click="back">Back</my-button>
        <my-button @click="registr">Registr</my-button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      authDto: {
        username: "",
        password: "",
      },
    };
  },
  methods:{
    back(){
      this.$router.back()
    },
    registr(){
      
    }
  },
  name: "login-page",
};
</script>
<style scoped>
.form {
  width: 800px;
  margin: auto;
}
</style>
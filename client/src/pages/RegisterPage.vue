<template>
  <div>
    <my-title>Registration</my-title>
    <form class="form">
      <form-control text="Username" v-model="authDto.username" />
      <form-control
        type="password"
        text="Password"
        v-model="authDto.password"
      />
      <form-control type="password" text="Repeat password" v-model="repeatedPassword" />
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
      repeatedPassword:''
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    registr() {
      if(this.repeatedPassword===this.authDto.password){
        
      }
    },
  },
  name: "register-page",
};
</script>
<style scoped>
.form {
  width: 800px;
  margin: auto;
}
</style>
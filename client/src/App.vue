<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions(['tryAuth'])
  },
  mounted() {
    this.tryAuth()
  },
};
</script>
<style>
body {
  background-color: aliceblue;
}
</style>
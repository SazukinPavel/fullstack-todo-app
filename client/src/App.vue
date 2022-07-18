<template>
    <LayoutVue>
      <router-view></router-view>
    </LayoutVue>
</template>
<script>
import { mapActions } from 'vuex';
import LayoutVue from './components/layouts/Layout.vue';
export default {
  methods: {
    ...mapActions(['tryAuth'])
  },
  mounted() {
    this.tryAuth()
  },
  components: {
    LayoutVue
  }
};
</script>
<style>
body {
  background-color: aliceblue;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

</style>
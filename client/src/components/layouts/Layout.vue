<template>
    <div class="app">
        <HeaderVue></HeaderVue>
        <slot></slot>
        <FooterVue></FooterVue>
    </div>
</template>
<script>
import FooterVue from './Footer.vue';
import HeaderVue from './Header.vue';

export default {
    components: { HeaderVue, FooterVue },
    name: 'my-layout'
}
</script>
<style>
.app {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr 6fr 1fr;
}
</style>
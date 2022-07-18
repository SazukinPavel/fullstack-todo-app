<template>
    <div>
        <HeaderVue></HeaderVue>
        <slot></slot>
        <FooterVue></FooterVue>
    </div>
</template>
<script>
import FooterVue from './Footer.vue';
import HeaderVue from './Header.vue';

export default {
    components:{HeaderVue,FooterVue},
    name:'my-layout'
}
</script>
<style>
    
</style>
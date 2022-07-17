<template>
    <div class="header">
        <h1>{{accessToken()}}</h1>
        <h1>{{isAuth()}}</h1>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters([
        'accessToken',
        'isAuth'
    ]),
    name:'my-header'
}
</script>
<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
    }
</style>
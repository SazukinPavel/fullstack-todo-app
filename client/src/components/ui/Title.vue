<template>
    <h1 class="header">
        <slot></slot>
    </h1>
</template>
<script>
export default {
    name:'my-title'
}
</script>
<style scoped>
    .header{
        text-align: center;
        font-size: 42px;
        color:teal;
    }
</style>
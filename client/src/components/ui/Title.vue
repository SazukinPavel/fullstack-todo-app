<template>
    <h1 class="title">
        <slot></slot>
    </h1>
</template>
<script>
export default {
    name:'my-title'
}
</script>
<style >
    .title{
        text-align: center;
        font-size: 42px;
        color:teal;
    }
</style>
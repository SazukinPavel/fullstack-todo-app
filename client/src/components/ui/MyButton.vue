<template>
    <button class="button">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name:'my-button'
}
</script>
<style scoped>
    .button{
        font-size: 30px;
        color: teal;
        padding:10px 15px;
        margin: 5px;
        border: 2px teal solid;
        border-radius: 20%;
        background-color: aliceblue;
    }
</style>
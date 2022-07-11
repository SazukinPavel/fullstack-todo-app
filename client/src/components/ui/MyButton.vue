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
        font-size: 35px;
        color: teal;
        padding:10px 15px;
        margin: 5px;
        border: 3px teal solid;
        border-radius: 20%;
        background-color: aliceblue;
        transition: all 0.3s;
    }
    .button:hover{
        color: rgb(6, 79, 79);
        border: 3px rgb(6, 79, 79) solid;
    }
      .button:focus{
        color: rgb(6, 79, 79);
        border: 3px rgb(6, 79, 79) solid;
    }
</style>
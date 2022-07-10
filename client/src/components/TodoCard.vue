<template>
    <div class="post">
        <p>{{title}}</p>
        <pre>{{description}}</pre>
    </div>
</template>
<script>
export default {
    props:{
        title:String,
        description:String
    },
    name:'todo-card'
}
</script>
<style scoped>
    .post p{
        font-size: 32px;
        text-align: center;
    }

    .post pre{
        font-size: 30px;
    }
</style>
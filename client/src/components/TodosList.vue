<template>
    <div class="postlist">
        <h1>Post List</h1>
        <todo-card v-for="todo in todos" :key="todo._id" :todo="todo"></todo-card>
    </div>
</template>
<script>
import TodoCard from "./TodoCard.vue";

export default {
    props: {
        todos: Array
    },
    methods: {},
    components: {
        TodoCard
    },
    name: 'todos-list'
}
</script>
<style>
.postlist h1 {
    text-align: center;
    color: teal;
    font-size: 40px;
}
</style>
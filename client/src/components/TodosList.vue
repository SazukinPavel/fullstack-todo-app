<template>
    <div class="postlist">
        <h1>Post List</h1>
        <todo-card @updateTodo="updateTodo" @deleteTodo="deleteTodo" v-for="todo in todos" :key="todo._id" :todo="todo"></todo-card>
    </div>
</template>
<script>
import TodoCard from "./TodoCard.vue";

export default {
    props: {
        todos: Array
    },
    methods: {
        deleteTodo(todo) {
            this.$emit('deleteTodo',todo)
        },
        updateTodo(todo){
            this.$emit('updateTodo',todo)
        }
    },
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
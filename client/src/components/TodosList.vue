<template>
    <div>
        <h1>Post List</h1>
        <todo-card v-for="(todo) in todos" :key="todo._id" :title="todo.title" :description="todo.description"></todo-card>
    </div>
</template>
<script>
import TodoCard from "./TodoCard.vue";

export default {
    props: {
        todos: Array
    },
    components: {
    TodoCard
},
    name: 'todos-list'
}
</script>
<style>
</style>
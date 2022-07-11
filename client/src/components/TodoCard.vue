<template>
    <div class="todo">
        <p class="title">{{ todo.title }}</p>
        <p class="description">{{ todo.description }}</p>
        <p class="completed">Completed:<span :class="{ green: todo.completed, red: !todo.completed }">{{ todo.completed ?
                'Completed' : 'Falled'
        }}</span></p>
        <div class="buttons">
            <my-button @click="deleteTodo" class="delete">Delete</my-button>
            <my-button @click="editTodo">Edit</my-button>
            <my-button @click="completeTodo">{{ todo.completed ? 'Fail' : 'Complete' }}</my-button>
        </div>
    </div>
</template>
<script>
import TodoService from '@/services/TodoService'


export default {
    props: {
        todo: Object
    },
    methods: {
        async deleteTodo() {
            const deletedTodo = await TodoService.deleteTodo(this.todo._id)
            this.$emit('deleteTodo', deletedTodo.data)
        },
        async completeTodo() {
            const updateDto = { ...this.todo }
            const updatedTodo = await TodoService.updateTodo(updateDto)
            this.$emit('updateTodo', updatedTodo)
        },
        editTodo() {
            this.$router.push({ path: `/todos/${this.todo._id}` })
        }
    },
    name: 'todo-card'
}
</script>
<style scoped>
.todo {
    width: 600px;
    border: 3px solid teal;
    margin: 20px auto;
    color: teal;
}

.todo p.title {
    padding: 10px 5px;
    text-align: center;
    font-size: 32px;
}

.todo p.description {
    padding: 0 10px;
    font-size: 30px;
}

.buttons {
    display: flex;
    justify-content: space-around;
}

.buttons .delete {
    background-color: rgb(218, 95, 95);
    border-color: brown;
    color: aliceblue;
}

.buttons .delete:focus {
    background-color: rgb(187, 68, 68);
    border-color: rgb(150, 38, 38);
    color: aliceblue;
}

.buttons .delete:hover {
    background-color: rgb(187, 68, 68);
    border-color: rgb(150, 38, 38);
    color: aliceblue;
}

.completed {
    font-size: 32px;
}

.completed span {
    font-size: 32px;
}

.completed span.red {
    color: rgb(218, 95, 95);
}

.completed span.green {
    color: teal;
}
</style>
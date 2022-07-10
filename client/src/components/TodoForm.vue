<template>
    <form class="form" @submit.prevent>
        <label>
            Title:
            <my-input v-model="todo.title"></my-input>
        </label>
        <label>
            Description:
            <my-input v-model="todo.description"></my-input>
        </label>
        <div class="buttons">
            <my-button @click="addTodo">Add</my-button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            todo: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        addTodo() {
            if (this.todo.title && this.todo.description) {
                this.$emit('addTodo', this.todo)
                this.todo = {}
            }
        },
    }
}
</script>
<style scoped>
.form label {
    display: block;
    width: 200px;
    margin: 20px auto;
    font-size: 32px;
    color: teal;
}

.form {
    width: 500px;
    margin: auto;
}

.buttons {
    display: flex;
    justify-content: center;
    margin: auto;
}
</style>
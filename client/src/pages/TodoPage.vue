<template>
    <div class="todo-page">
        <div class="todo">
            <label>
                Title:
                <my-input v-model="todo.title" />
            </label>
            <label>
                Description
                <my-input v-model="todo.description" />
            </label>
            <div class="completed">
                <p>Completed:
                    <span :class="{ green: todo.completed, red: !todo.completed }">{{ todo.completed ? 'Completed' :
                            'Falled'
                    }}</span>
                </p>
                <my-button @click="switchComplete">{{ !todo.completed ? 'Complete' : 'Fail' }}</my-button>
            </div>
            <div class="buttons">
                <my-button @click="goBack">Back</my-button>
                <my-button @click="deleteTodo">Delete</my-button>
                <my-button @click="saveTodo">Save</my-button>
            </div>
        </div>
    </div>
</template>
<script>
import TodoService from '@/services/TodoService';

export default {
    data() {
        return {
            todo: {}
        }
    },
    props: {
        id: String
    },
    methods: {
        async fetchTodo() {
           this.todo=await TodoService.fetchTodo(this.id)
        },
        switchComplete(){
            this.todo.completed=!this.todo.completed
        },
        async deleteTodo(){
            await TodoService.deleteTodo(this.todo._id)
            this.goBack()
        },
        async saveTodo(){
            const updated=await TodoService.updateTodo({...this.todo})
            console.log(updated);
            this.todo=updated
        },
        goBack(){
            this.$router.back()
        }
    },
    mounted() {
        this.fetchTodo()
    },
    name: 'todo-page'
}
</script>
<style>

.todo-page{
    display: flex;
}
.todo {
    margin: 100px auto;
}

label {
    display: block;
    margin: 20px 0;
    font-size: 32px;
    color: teal;
}

.completed {
    display: flex;
    padding: 0 100px;
    justify-content: space-around;
}

.completed p {
    font-size: 32px;
    color: teal;
    margin-right: 30px;
}

.completed button {
    border-radius: 0px;
}

.buttons {
    display: flex;
    justify-content: center;
}

.buttons button {
    margin: 30px;
}
</style>
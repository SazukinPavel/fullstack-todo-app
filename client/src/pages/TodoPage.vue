<template>
    <div class="todo-page">
        <div class="todo">
            <label>
                Title:
                <my-input v-model="currentTodo.title" />
            </label>
            <label>
                Description
                <my-input v-model="currentTodo.description" />
            </label>
            <div class="completed">
                <p>Completed:
                    <span :class="{ green: currentTodo.completed, red: !currentTodo.completed }">{{
                            currentTodo.completed ? 'Completed' :
                                'Falled'
                    }}</span>
                </p>
                <my-button @click="switchComplete">{{ !currentTodo.completed ? 'Complete' : 'Fail' }}</my-button>
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
import { mapActions, mapGetters } from 'vuex';
export default {
    computed: mapGetters(['currentTodo']),
    props: {
        id: String
    },
    methods: {
        ...mapActions(['updateCurrentTodo','deleteCurrentTodo','fetchCurrentTodo','resetCurrentTodo']),
        switchComplete() {
            this.currentTodo.completed = !this.currentTodo.completed
        },
        async deleteTodo() {
            this.deleteCurrentTodo()
            this.goBack()
        },
        async saveTodo() {
            this.updateCurrentTodo({ ...this.currentTodo })
        },
        goBack() {
            this.resetCurrentTodo()
            this.$router.back()
        }
    },
    mounted() {
        this.fetchCurrentTodo(this.id)
    },
    name: 'todo-page'
}
</script>
<style>
.todo-page {
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
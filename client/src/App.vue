<template>
  <div>
    <my-modal v-model:show="showAddTodo">
      <todo-form @addTodo="addTodo"></todo-form>
    </my-modal>
    <my-button @click="showAddTodoClick">Add todo</my-button>
    <todos-list v-if="!isPostLoading" @updateTodo="updateTodo" @deleteTodo="deleteTodo" :todos="todos"></todos-list>
    <my-loading v-else></my-loading>
  </div>
</template>
<script>
import TodosList from './components/TodosList.vue';
import TodoForm from './components/TodoForm.vue';
import axios from 'axios'
import MyButton from './components/ui/MyButton.vue';
export default {
  data() {
    return {
      todos: [],
      showAddTodo: false,
      isPostLoading:false
    }
  },
  methods: {
    async addTodo(todoDto) {
      try {
        const todo = (await axios.post('http://localhost:4200/todos', todoDto)).data
        this.todos.push(todo)
        this.showAddTodo = false
      } catch (e) {
        console.log(`Error with add todo((( Error:${e}`);
      }
    },
    async fetchTodos() {
      this.isPostLoading=true
      setTimeout(async () => {
        try {
          this.todos = (await axios.get('http://localhost:4200/todos')).data
          this.isPostLoading=false
        } catch (e) {
          console.log(`Error with fetch todo((( Error:${e}`);
        }
      }, 1000);
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter((t) => t._id !== todo._id)
    },
    updateTodo(todo) {
      this.todos = this.todos.map(t => {
        if (t._id === todo._id) {
          t.completed = !t.completed
          return t
        }
        return t
      })
    },
    showAddTodoClick() {
      this.showAddTodo = true
    }
  },
  mounted() {
    this.fetchTodos()
  },
  components: { TodosList, TodoForm, MyButton }
}
</script>
<style>
body {
  background-color: aliceblue;
}
</style>
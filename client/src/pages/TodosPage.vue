<template>
  <div>
    <my-modal v-model:show="showAddTodo">
      <todo-form @addTodo="addTodo"></todo-form>
    </my-modal>
    <div class="add_todo">
      <my-button @click="showAddTodoClick">Add todo</my-button>
    </div>
    <todos-list v-if="!isPostLoading" @updateTodo="updateTodo" @deleteTodo="deleteTodo" :todos="todos"></todos-list>
    <my-loading v-else></my-loading>
  </div>
</template>
<script>
import TodosList from '../components/TodosList.vue';
import TodoForm from '../components/TodoForm.vue';
import MyButton from '../components/ui/MyButton.vue';
import TodoService from '@/services/TodoService';
export default {
  data() {
    return {
      todos: [],
      showAddTodo: false,
      isPostLoading: false
    }
  },
  methods: {
    async addTodo(todoDto) {
      const todo = await TodoService.addTodo(todoDto)
      this.todos.push(todo)
      this.showAddTodo = false
    },
    async fetchTodos() {
      this.isPostLoading = true
      setTimeout(async () => {
        this.todos = await TodoService.fetchTodos()
        this.isPostLoading = false
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
  name: 'todos-page',
  components: { TodosList, TodoForm, MyButton }
}
</script>
<style>
.add_todo {
  display: flex;
  justify-content: center;
}

.add_todo button {
  width: 400px;
  border-radius: 0%;
}
</style>
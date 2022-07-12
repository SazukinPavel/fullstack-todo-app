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
import { mapState } from 'vuex';
export default {
  data() {
    return {
      showAddTodo: false,
      isPostLoading: false
    }
  },
  computed: mapState([
    'todos'
  ]),
  methods: {
    async addTodo(todoDto) {
        await this.$store.dispatch('addTodo',(todoDto))
      this.showAddTodo = false
    },
    async fetchTodos() {
      this.isPostLoading = true
      setTimeout(async () => {
        await this.$store.dispatch('fetchTodos')
        this.isPostLoading = false
      }, 1000);
    },
    deleteTodo(todo) {
      this.$store.dispatch('deleteTodo',(todo._id))
    },
    updateTodo(todo) {
      this.$store.dispatch('updateTodo',(todo))
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
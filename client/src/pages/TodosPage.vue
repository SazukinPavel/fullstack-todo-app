<template>
  <div>
    <my-modal v-model:show="showAddTodo">
      <todo-form @addTodo="addTodoClick"></todo-form>
    </my-modal>
    <div class="add_todo">
      <my-button @click="showAddTodoClick">Add todo</my-button>
    </div>
    <todos-list v-if="!isPostLoading" :todos="todos"></todos-list>
    <my-loading v-else></my-loading>
  </div>
</template>
<script>
import TodosList from '../components/TodosList.vue';
import TodoForm from '../components/TodoForm.vue';
import MyButton from '../components/ui/MyButton.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
  data() {
    return {
      showAddTodo: false,
      isPostLoading: false
    }
  },
  computed: mapGetters([
    'todos'
  ]),
  methods: {
    ...mapActions(['fetchTodos', 'addTodo']),
    async addTodoClick(todoDto) {
      await this.addTodo(todoDto)
      this.showAddTodo = false
    },
    async fetchTodosAsync() {
      this.isPostLoading = true
      setTimeout(async () => {
        this.fetchTodos()
        this.isPostLoading = false
      }, 1000);
    },
    showAddTodoClick() {
      this.showAddTodo = true
    }
  },
  mounted() {
    this.fetchTodosAsync()
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
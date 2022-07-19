<template>
  <div class="todos">
    <my-modal v-model:show="showAddTodo">
      <todo-form @addTodo="addTodoClick"></todo-form>
    </my-modal>
    <div class="todos__buttons">
      <my-button @click="showAddTodoClick">Add todo</my-button>
      <my-select :options="sortOptions" v-model="selectedSort"></my-select>
    </div>
    <todos-list v-if="!isPostLoading" :todos="todos"></todos-list>
    <my-loading v-else></my-loading>
  </div>
</template>
<script>
import TodosList from '../components/TodosList.vue';
import TodoForm from '../components/TodoForm.vue';
import MyButton from '../components/ui/MyButton.vue';
import { mapActions, mapGetters } from 'vuex';
import MySelect from '@/components/ui/MySelect.vue';
export default {
  data() {
    return {
      showAddTodo: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'By title' },
        { value: 'description', name: 'By description' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'todos'
    ])
  },
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
  watch:{
     selectedSort(){
      this.todos.sort((todo1,todo2)=>{
        return todo1[this.selectedSort]?.localeCompare(todo2[this.selectedSort])
      })
    }
  },
  mounted() {
    this.fetchTodosAsync()
  },
  name: 'todos-page',
  components: { TodosList, TodoForm, MyButton, MySelect }
}
</script>
<style>
.todos__buttons {
  display: flex;
  justify-content: space-between;
}


.todos {
  margin-top: 40px;
}
</style>
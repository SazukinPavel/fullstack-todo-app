<template>
  <div>
    <todo-form @addTodo="addTodo"></todo-form>
    <todos-list @updateTodo="updateTodo" @deleteTodo="deleteTodo" :todos="todos"></todos-list>
  </div>
</template>
<script>
import TodosList from './components/TodosList.vue';
import TodoForm from './components/TodoForm.vue';
import axios from 'axios'
export default {
  data() {
    return {
      todos: []
    }
  },
  methods: {
    async addTodo(todoDto) {
      try{
        const todo=(await axios.post('http://localhost:4200/todos',todoDto)).data
      this.todos.push(todo)
      }catch(e){
        console.log(`Error with add todo((( Error:${e}`);
      }
    },
    async fetchTodos() {
      try{
      this.todos = (await axios.get('http://localhost:4200/todos')).data

      }catch(e){
        console.log(`Error with fetch todo((( Error:${e}`);
      }
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter((t) => t._id !== todo._id)
    },
    updateTodo(todo){
      this.todos = this.todos.map(t=>{
        if(t._id===todo._id){
          t.completed=!t.completed
          return t
        }
        return t
      })
    }
  },
  mounted() {
    this.fetchTodos()
  },
  components: { TodosList, TodoForm }
}
</script>
<style>
body {
  background-color: aliceblue;
}
</style>
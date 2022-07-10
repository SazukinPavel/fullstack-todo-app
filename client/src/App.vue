<template>
  <div>
    <TodoForm></TodoForm>
    <todos-list :todos="todos"></todos-list>
  </div>
</template>
<script>
import TodosList from './components/TodosList.vue';
import TodoForm from './components/TodoForm.vue';
export default {
    data(){
      return{
        todos:[
          {_id:'123',title:'1',description:'some'},
          {_id:'23',title:'2',description:'some'},
          {_id:'134',title:'3',description:'some'},
        
        ]
      }
    },
    components: { TodosList, TodoForm }
}
</script>
<style>
  
</style>
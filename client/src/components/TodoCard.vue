<template>
    <div class="todo">
        <p class="title">{{ todo.title }}</p>
        <p class="description">{{ todo.description }}</p>
        <p class="completed">Completed:<span :class="completed?'green':'red'">{{ todo.completed ? 'Completed':'Falled' }}</span></p>
        <div class="buttons">
            <my-button @click="deleteTodo" class="delete">Delete</my-button>
            <my-button>Edit</my-button>
            <my-button @click="completeTodo">{{todo.completed ? 'Fail':'Complete'}}</my-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    props: {
        todo:Object
    },
    methods:{
        async deleteTodo(){
            try{
                const deletedTodo=await axios.delete(`http://localhost:4200/todos/${this.todo._id}`)
                this.$emit('deleteTodo',deletedTodo.data)
            }catch(e){
                console.log(`Cant delete todo((( Error:${e}`);
            }
        },
        async completeTodo(){
            try{
                const updateDto={...this.todo}
                const updatedTodo=(await axios.put(`http://localhost:4200/todos/${this.todo._id}`,{...updateDto,completed:!updateDto.completed})).data
                this.$emit('updateTodo',updatedTodo)
            }catch(e){
                console.log(`Cant update todo((( Error:${e}`);
            }
        }
    },  
    name: 'todo-card'
}
</script>
<style scoped>
.todo {
    width: 500px;
    border: 3px solid teal;
    margin: 20px auto;
    color: teal;
}

.todo p.title {
    padding: 10px 5px;
    text-align: center;
    font-size: 32px;
}

.todo p.description {
    padding: 0 10px;
    font-size: 30px;
}

.buttons{
    display: flex;
    justify-content: center;
}

.buttons .delete{
    background-color: rgb(218, 95, 95);
    border-color: brown;
    color: aliceblue;
}

.completed{
    font-size: 32px;
}

.completed span{
    font-size: 32px;
}

.completed span.red{
    color: rgb(218, 95, 95);
}
.completed span.green{
    color: teal;
}
</style>
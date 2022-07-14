<template>
  <form class="form" @submit.prevent>
    <form-control text="Title" v-model="todo.title"></form-control>
    <form-control text="Description" v-model="todo.description"></form-control>
    <div class="buttons">
      <my-button @click="addTodo">Add</my-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      todo: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    addTodo() {
      if (this.todo.title && this.todo.description) {
        this.$emit("addTodo", this.todo);
        this.todo = {};
      }
    },
  },
};
</script>
<style scoped>
.form {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  justify-content: center;
  margin: auto;
}
</style>
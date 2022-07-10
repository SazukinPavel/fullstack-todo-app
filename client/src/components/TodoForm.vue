<template>
    <div>
        <form @submit.prevent>
            <my-input v-model="post.title"></my-input>
            <my-input v-model="post.description"></my-input>
            <my-button>Add</my-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            post:{
                title: '',
                description: ''
            }
        }
    }
}
</script>
<style>
</style>
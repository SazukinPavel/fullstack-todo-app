<template>
    <div @click.stop="hideAddTodo" class="modal" v-if="show">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        hideAddTodo(){
            this.$emit('update:show',false)
        }
    },
    name:'my-modal'
}
</script>
<style scoped>
.modal {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
}

.modal__content{
    padding: 50px;
    min-width: 50px;
    min-height: 50px;
    border-radius: 15px;
    margin: auto;
    background-color: aliceblue ;
}
</style>
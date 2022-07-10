<template>
    <input class="input" type="text" @change="updateInputValue" :value="modelValue"/>
</template>
<script>
export default {
    props:{
        modelValue:[String,Number]
    },  
    methods:{
        updateInputValue(e){
            this.$emit('update:modelValue',e.target.value)
        }
    },  
    name:'my-input'
}
</script>
<style scoped>
    .input{
        color: teal;
        width: 200px;
        padding: 5px 10px;
        font-size: 30px;
        border: 2px teal solid;
    }
</style>
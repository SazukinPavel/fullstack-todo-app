<template>
    <input type="text" @change="updateInputValue" :value="modelValue"/>
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
<style>
    
</style>
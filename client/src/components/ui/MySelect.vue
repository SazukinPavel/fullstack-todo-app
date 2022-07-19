<template>
    <select class="my-select" @change="changeOption">
        <option selected="selected" disabled value="">Choose parametr</option>
        <option v-for="option in options"
        :value="option.value"
        :key="option.value">
            {{option.name}}        
        </option>
    </select>
</template>
<script>
export default {
    name:'my-select',
    props:{
        options:{
            type:Array,
            default:()=>[]
        },
        modelValue:{
            type:String
        }
    },
    methods: {
        changeOption(e){
            this.$emit('update:modelValue',e.target.value)
        }
    },
}
</script>
<style>
    .my-select{
        border:4px solid teal;
        background-color: aliceblue;
        font-size: 30px;
        color: teal;
    }

    .my-select option{
        font-size: 30px;
        color: teal;
    }
</style>
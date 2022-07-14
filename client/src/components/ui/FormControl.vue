<template>
  <label class="formControl">
    {{ text }}:
    <input :type="type" :value="modelValue" @change="updateInputValue" />
  </label>
</template>
<script>
export default {
  name: "form-control",
  props: {
    modelValue: String,
    text: String,
    type:{
      type:String,
      default:'text'
    }
  },
  methods: {
    updateInputValue(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
<style>
.formControl {
  display: block;
  margin: 20px 0;
  font-size: 32px;
  color: teal;
}
.formControl input {
  color: teal;
  padding: 5px 15px;
  font-size: 30px;
  width: 100%;
  border: 2px teal solid;
}
</style>
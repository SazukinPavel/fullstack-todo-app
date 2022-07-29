<template>
  <div class="form-control">
    <label>
      {{ text }}:
    </label>
    <input :type="type" :value="modelValue" @change="updateInputValue" />
  </div>
</template>
<script>
export default {
  name: "form-control",
  props: {
    modelValue: String,
    text: String,
    type: {
      type: String,
      default: 'text'
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
.form-control{
  margin: 20px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.form-control label {
  font-size: 32px;
  color: teal;
}

.form-control input {
  color: teal;
  padding: 5px 15px;
  font-size: 30px;
  margin: auto;
  border: 2px teal solid;
}
</style>
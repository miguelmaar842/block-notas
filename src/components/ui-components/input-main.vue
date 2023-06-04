<template>
    <input :type="typeInput" class="
    border 
    border-main 
    rounded-md h-[44px] px-4 py-2 mb-4 font-btn" :name="name" :placeholder="placename"
    v-model="model"
    >
</template>
<script>
export default {
    name: "InputMain",
    props: {
        placename: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        typeInput: {
            type: String,
            required: true
        }
    },
    computed: {
      model: {
        get() {
          return this.modelValue
        },
        set(modelValue) {
          this.$emit('update:modelValue', modelValue)
        }
      }
    }
}
</script>
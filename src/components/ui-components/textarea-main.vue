<template>
    <textarea class="
    border 
    border-main 
    h-[150px]
    max-h-[150px]
    rounded-md px-4 py-2 mb-4 font-btn" :name="name" :placeholder="placename"
    v-model="model"></textarea>
</template>
<script>
export default {
    name: "TextAreaMain",
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
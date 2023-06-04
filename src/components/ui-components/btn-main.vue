<template>
    <button :type="typeBtn" class="btn-main">
    {{message}}
    </button>
</template>
<script>
export default {
    name: "BtnMain",
    props: {
        typeBtn: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
}
</script>
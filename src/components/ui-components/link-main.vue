<template>
    <router-link :to="url" :class="background" class="link-main">
        {{ message }}
    </router-link>
</template>
<script>
export default {
    name: "LinkMain",
    props: {
        url: {
            type: Object,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        background: {
            type: String,
            required: true
        }
    }
}
</script>
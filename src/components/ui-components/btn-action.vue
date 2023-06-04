<template>
    <button type="button" :class="background" v-on:click="accionButton" class="btn-action">
        <div v-if="typeIcon == 'add'">
            <PlusIcon class="text-white h-5 w-5"></PlusIcon>
        </div>
        <div v-if="typeIcon == 'remove'">
            <TrashIcon class="text-white h-5 w-5"></TrashIcon>
        </div>
        <div v-if="typeIcon == 'user'">
            <UserIcon class="text-white h-5 w-5"></UserIcon>
        </div>
    </button>
</template>
<script>

import { PlusIcon, TrashIcon, UserIcon } from '@heroicons/vue/24/solid';

export default {
    name: "BtnAction",
    props: {
        typeIcon: {
            type: String,
            required: true
        },
        background: {
            type: String,
            required: true
        }
    },
    components:{
        PlusIcon,
        TrashIcon,
        UserIcon
    },
    methods: {
        accionButton() {
            this.$emit('myAccion');
        }
    }
}
</script>
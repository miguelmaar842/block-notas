<template>
    <div class="flex flex-col">
        <NotaItem v-for="(item, index) in dataList" v-bind:info-item="item" v-bind:key="index"></NotaItem>
    </div>
</template>
<script>
import NotaItem from './nota-item.vue';
export default {
    name: "ListaNotas",
    props:{
        dataList:{
            required: true,
            type: Array
        }
    },
    components:{
        NotaItem
    }
}
</script>
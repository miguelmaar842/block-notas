<template>
  <div class="min-h-screen degradado-home py-40 relative">
    <div class="container">
      <div class="flex flex-col md:flex-row md:items-center relative">
        <div class="md:w-[65%] xl:max-w-[600px] lg:text-right md:order-2">
          <h1 class="title-home">Guarda las notas de manera segura</h1>
        </div>
        <div class="md:w-[35%] md:order-1">
          <img :src="require('@/assets/note.png')" class="max-w-full" alt="note img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  }
}
</script>

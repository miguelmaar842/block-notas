<template>
  <nav class="fixed top-0 left-0 z-50 w-full bg-sky-700">
    <div class="container">
      <div class="flex items-center justify-between h-[90px]">
        <router-link to="/">
          <img :src="require('@/assets/itss.png')" class="shadow-itss" alt="logo">
        </router-link>
        <div class="hidden md:flex" v-if="!usuarioAutenticado">
          <link-main :url="{ name: 'login' }" background="bg-main" message="Login" class="mr-4"></link-main>
          <link-main :url="{ name: 'registro' }" background="bg-secondary" message="Registro"></link-main>
        </div>
        <div class="md:hidden" v-if="!usuarioAutenticado">
          <btn-action background="btn-user" type-icon="user" v-on:my-accion="routeLogin()"></btn-action>
        </div>
        <div v-if="usuarioAutenticado" class="rounded-full h-12 w-12 bg-secondary cursor-pointer flex justify-center items-center hover:bg-main transition-all" @click="openMenu();">
          <Bars2Icon class="h-6 w-6 text-white"/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Bars2Icon } from '@heroicons/vue/24/solid'
import LinkMain from '@/components/ui-components/link-main.vue'
import { mapGetters } from "vuex"
import { gsap } from 'gsap'
import BtnAction from '@/components/ui-components/btn-action.vue';
export default {
  name: "NavBar",
  components: {
    LinkMain,
    Bars2Icon,
    BtnAction
  },
  methods: {
    openMenu(){
      gsap.to('.sidebar', { x: "0%", duration:0.5,  ease: "expo.out" });
    },
    routeLogin(){
      this.$router.push('login');
    }
  },
  computed: {
    ...mapGetters(["usuarioAutenticado"])
  }
}
</script>
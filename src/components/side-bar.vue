<template>
    <div
        class="sidebar fixed top-0 bottom-0 right-0 p-2 w-[350px] overflow-y-auto text-center bg-tertiary z-50 translate-x-[100%]">
        <div class="flex justify-end" @click="closeMenu();">
            <XMarkIcon class="h-8 w-8 text-white cursor-pointer" />
        </div>
        <div class="p-2.5 mt-1 flex items-center">
            <h4 class="font-bold text-white">MENU</h4>
        </div>
        <div class="my-2 bg-white h-[1px]"></div>
        <router-link to="/notas"
            class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-main text-white">
            <PencilIcon class="h-8 w-8 text-white" />
            <div class="flex justify-between w-full items-center">
                <span class="h5 ml-4">Notas</span>
            </div>
        </router-link>
        <div class="my-2 bg-white h-[1px]"></div>
        <div class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-main text-white"
            @click="logout();">
            <ArrowLeftOnRectangleIcon class="h-8 w-8 text-white" />
            <div class="flex justify-between w-full items-center">
                <span class="h5 ml-4">Cerrar Sesión</span>
            </div>
        </div>
    </div>
</template>

<script>
import { XMarkIcon, ArrowLeftOnRectangleIcon, PencilIcon } from '@heroicons/vue/24/solid';
import { gsap } from 'gsap';
import { mapActions } from 'vuex';
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
export default {
    name: "SideBar",
    components: {
        XMarkIcon,
        // IdentificationIcon,
        ArrowLeftOnRectangleIcon,
        PencilIcon
    },
    methods: {
        ...mapActions(["cerrarSesion"]),
        closeMenu() {
            gsap.to('.sidebar', { duration: 0.5, x: "100%" });
        },
        async logout() {
            try {
                await signOut(auth);
                this.closeMenu();
                this.cerrarSesion();
                this.$router.push('/');
            } catch (error) {
                alert(error);
            }
        }
    }
}
</script>
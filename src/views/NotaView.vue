<template>
    <div class="container">
        <div class="max-w-[500px]">
            <div class="flex flex-col">
                <h2 class="text-secondary mb-8">{{ this.$route.params.id ? 'Editar nota' : 'Nueva nota' }}</h2>
                <form @submit.prevent="guardarNota()" novalidate>
                    <div class="flex flex-col" :class="{ error: v$.titulo.$errors.length }">
                        <label for="titulo" class="mb-2 text-main p">Título</label>
                        <input-main name="titulo" typeInput="text" v-model="titulo"
                            placename="Escribe un título"></input-main>
                        <div class="input-errors" v-for="error of v$.titulo.$errors" :key="error.$uid">
                            <div class="text-redme p-small mb-2">{{ error.$message }}</div>
                        </div>
                    </div>
                    <div class="flex flex-col" :class="{ error: v$.texto.$errors.length }">
                        <label for="texto" class="mb-2 text-main p">Texto</label>
                        <TextAreaMain name="texto" v-model="texto" placename="Escribe un texto"></TextAreaMain>
                        <div class="input-errors" v-for="error of v$.texto.$errors" :key="error.$uid">
                            <div class="text-redme p-small mb-2">{{ error.$message }}</div>
                        </div>
                    </div>
                    <btn-main class="mt-2" typeBtn="submit" message="Guardar"></btn-main>
                    <link-main :url="{ name: 'Notas' }" background="bg-secondary" message="Regresar"
                        class="ml-4"></link-main>
                    <p class="text-redme mt-4" v-if="this.errorGeneral">{{ errorGeneral }}</p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import InputMain from '@/components/ui-components/input-main.vue';
import BtnMain from '@/components/ui-components/btn-main.vue';
import TextAreaMain from '@/components/ui-components/textarea-main.vue';
import LinkMain from '@/components/ui-components/link-main.vue'
import { mapActions, mapState } from 'vuex';
import { db } from '@/firebase';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import getError from '@/functions/ManageErrors';

export default {
    name: "NotaView",
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({ nameView: "Agregar", id: 'asd', titulo: "", texto: "", fecha: "", errorGeneral: "" }),
    components: {
        BtnMain,
        InputMain,
        TextAreaMain,
        LinkMain
    },
    computed: {
        ...mapState(['notas'])
    },
    mounted() {
        if (this.$route.params.id != '')
            this.findNota();
    },
    methods: {
        ...mapActions(['agregarNota']),
        async guardarNota() {
            const result = await this.v$.$validate()
            if (!result)
                return;
            let loader = this.$loading.show({
                canCancel: false,
                color: '#0081B4'
            });
            this.errorGeneral = "";
            if (this.$route.params.id == "") {
                this.crearNota();
            } else {
                this.actualizarNota();
            }
            loader.hide();
        },
        async crearNota() {
            let loader = this.$loading.show({
                canCancel: false,
                color: '#0081B4'
            });
            const result = await this.agregarNota({ titulo: this.titulo, texto: this.texto });
            if (result.res) {
                this.$router.push('notas');
            } else {
                const errorMessage = getError(result.error);
                this.errorGeneral = errorMessage;
                this.$swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            loader.hide();
        },
        async findNota() {
            let loader = this.$loading.show({
                canCancel: false,
                color: '#0081B4'
            });
            const docRef = doc(db, 'notas', this.$route.params.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const { titulo, texto } = docSnap.data();
                this.id = this.$route.params.id;
                this.titulo = titulo;
                this.texto = texto;
            } else {
                const errorMessage = getError("");
                this.errorGeneral = errorMessage;
                this.$swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            loader.hide();
        },
        async actualizarNota() {
            let loader = this.$loading.show({
                canCancel: false,
                color: '#0081B4'
            });
            try {
                const notaRef = doc(db, "notas", this.id);
                await updateDoc(notaRef, {
                    titulo: this.titulo,
                    texto: this.texto
                });
                this.$router.go(-1);
            } catch (error) {
                const errorMessage = getError(error);
                this.errorGeneral = errorMessage;
                this.$swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
            loader.hide();
        }
    },
    validations() {
        return {
            titulo: {
                required: helpers.withMessage('El título es requerido', required)
            },
            texto: {
                required: helpers.withMessage('El texto es requerido', required)
            },
        }
    }
}
</script>
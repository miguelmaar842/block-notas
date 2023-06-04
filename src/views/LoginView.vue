<template>
  <div class="container">
    <div class="md:min-h-[500px] flex md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div class="flex flex-col">
          <h1 class="text-tertiary mb-8 md:mb-0">Accesa a tus notas personales aquí.</h1>
        </div>
        <div class="flex flex-col">
          <form class="w-full lg:pl-24" @submit.prevent="ingresarUsuario()" novalidate>
            <div class="md:p-12 md:bg-secondary rounded-md">
              <div class="flex flex-col" :class="{ error: v$.correo.$errors.length }">
                <label for="correo" class="mb-2 text-main  md:text-white p">Correo electronico</label>
                <input-main name="correo" typeInput="email" v-model="correo" placename="Correo electronico"></input-main>
                <div class="input-errors" v-for="error of v$.correo.$errors" :key="error.$uid">
                  <div class="text-redme p-small mb-2">{{ error.$message }}</div>
                </div>
              </div>
              <div class="flex flex-col">
                <label for="password" class="mb-2 text-main md:text-white p">Contraseña</label>
                <input-main name="password" typeInput="password" v-model="password" placename="Contraseña"></input-main>
                <div class="input-errors" v-for="error of v$.password.$errors" :key="error.$uid">
                  <div class="text-redme p-small mb-2">{{ error.$message }}</div>
                </div>
              </div>
              <btn-main typeBtn="submit" message="Entrar"></btn-main>
              <p class="text-redme mt-4" v-if="this.errorGeneral">{{ errorGeneral }}</p>
              <router-link to="/registro" class="block mt-3 text-secondary md:text-white">Si aun no estas registrado,
                click aqui!</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputMain from '@/components/ui-components/input-main.vue';
import BtnMain from '@/components/ui-components/btn-main.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { mapActions } from 'vuex';
import getError from '@/functions/ManageErrors';

export default {
  name: 'LoginView',
  setup: () => ({ v$: useVuelidate() }),
  data: () => ({ correo: '', password: '', errorGeneral: '' }),
  components: {
    InputMain,
    BtnMain
  },
  methods: {
    ...mapActions(["setUsuario"]),
    async ingresarUsuario() {
      const result = await this.v$.$validate()
      if (!result)
        return;
      let loader = this.$loading.show({
        canCancel: false,
        color: '#0081B4'
      });
      this.errorGeneral = "";
      try {
        const { user } = await signInWithEmailAndPassword(auth, this.correo, this.password);
        this.setUsuario(user);
        this.$router.push('notas');
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
      correo: {
        required: helpers.withMessage('El correo es requerido', required),
        email: helpers.withMessage('El correo es incorrecto', email)
      },
      password: {
        required: helpers.withMessage('La contraseña es requerida', required)
      },
    }
  }
}
</script>
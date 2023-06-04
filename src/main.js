import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import { auth } from "@/firebase";
import {LoadingPlugin} from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

let app;
auth.onAuthStateChanged(function (user) {
    if (user) {
        store.dispatch('setUsuario', user);
        console.log(user);
    }
    if (!app) {
        app = createApp(App).use(store).use(LoadingPlugin).use(VueSweetalert2).use(router).mount('#app')
    }
});
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from "@/firebase";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/PerfilView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import('../views/NotasView.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/nota/:id?',
    name: 'Nota',
    component: () => import('../views/NotaView.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next('/login')
    }
  } else {
    next() // make sure to always call next()!
  }
})
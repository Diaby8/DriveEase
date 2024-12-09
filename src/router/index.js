import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LuxuryView from '../views/LuxuryView.vue'
import StandardView from '../views/StandardView.vue'
import AdminLogin from '../views/AdminLogin.vue' // Vue pour la connexion admin
import AdminDashboard from '../views/AdminDashboard.vue' // Importez le composant
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/home',
    redirect: '/' // Redirige `/home` vers `/`
  },
  {
    path: '/luxury',
    name: 'luxury',
    component: LuxuryView
  },
  {
    path: '/standard',
    name: 'standard',
    component: StandardView
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    component: AdminLogin // Page d'authentification admin
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    component: AdminDashboard // Associez le composant AdminDashboard
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router

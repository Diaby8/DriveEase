import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LuxuryView from '../views/LuxuryView.vue'
import StandardView from '../views/StandardView.vue'
import AdminLogin from '../views/AdminLogin.vue' // Vue pour la connexion admin
import AdminDashboard from '../views/AdminDashboard.vue' // Importez le composant

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LuxuryView from '../views/LuxuryView.vue'
import StandardView from '../views/StandardView.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

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
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // Force le défilement en haut à chaque navigation
    return { top: 0 }
  }
})

export default router

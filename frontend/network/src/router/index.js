import { createRouter, createWebHistory } from 'vue-router'
import MenteeView from '../views/MenteeView.vue'
import Login from '../views/Login.vue'
import MentorList from '@/components/MentorList.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/mentee',
      name: 'mentee',
      component: MenteeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/mentorsList',
      name: 'listOfMentors',
      component: MentorList
    }
  ]
})

export default router

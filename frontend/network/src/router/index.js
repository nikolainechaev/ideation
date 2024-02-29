import { createRouter, createWebHistory } from 'vue-router'
import MenteeView from '../views/MenteeView.vue'
import LoginFormComponent from '../components/LoginFormComponent.vue'
import MentorList from '@/components/MentorList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mentee',
      name: 'home',
      component: MenteeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginFormComponent
    },
    {
      path: '/mentorsList',
      name: 'listOfMentors',
      component: MentorList
    }
  ]
})

export default router

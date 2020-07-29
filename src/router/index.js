import Vue from 'vue'
import VueRouter from 'vue-router'
import AGENDA from '../views/agenda.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Agenda',
    component: AGENDA
  }
]

const router = new VueRouter({
  routes
})

export default router

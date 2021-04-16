import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Testimony from '../views/Testimony.vue'
import Browse from '../views/Browse.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/testimony',
    name: 'Testimony',
    component: Testimony
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

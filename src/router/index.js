import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'authLayout'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'authLayout'
    },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Categories.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/History.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'mainLayout'
    },
    component: () => import('@/views/Records.vue')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home'),
      },
      {
        path: 'find',
        name: 'find',
        component: () => import('@/views/find'),
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/news'),
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my'),
      },
    ],
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/views/home/city'),
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/home/map'),
  },
  {
    path: '/homedetail',
    name: 'homedetail',
    component: () => import('@/views/home/homedetail'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/my/login'),
  },
  {
    path: '/mycllect',
    name: 'mycllect',
    component: () => import('@/views/my/mycllect'),
  },
  {
    path: '/myrent',
    name: 'myrent',
    component: () => import('@/views/my/myrent'),
  },
  {
    path: '/puthome',
    name: 'puthome',
    component: () => import('@/views/my/puthome'),
  },
  {
    path: '/rentsearch',
    name: 'rentsearch',
    component: () => import('@/views/my/rentsearch'),
  },
]

const router = new VueRouter({ routes })

export default router

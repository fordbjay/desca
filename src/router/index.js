import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
    { 
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: "Home"
          }
    },
    { 
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
            title: "About"
          }
    },
    {
        path: '/setups/:user',
        name: 'Setups',
        component: () => import('../views/Setups.vue')
      },
      {
        path: '/edit/:user/:setupId',
        name: 'Edit',
        component: () => import('../views/Edit.vue'),
      },
      {
        path: '/:user/:setupId',
        name: 'View',
        component: () => import('../views/View.vue'),
      },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    mode: "history",
    scrollBehavior (to, from, savedPosition) {
      return { top: 0 }
    },
  })
  

export default router
import { createRouter, createWebHistory } from 'vue-router'

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
        component: () => import('../views/Edit.vue')
      },
]

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router
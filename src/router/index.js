import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

/*const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'products',
      component: () =>  import('../views/Products.vue')
    },
  ]


})*/
const routes = [
  {
    path: '/',
    name: 'products',
    component: () =>  import('../views/Products.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})
export default router

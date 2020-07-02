import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Estado',
    component: () => import('../views/estado/EstadoCrudList.vue'),
  },
  {
    path: '/cidade',
    name: 'Cidades',
    component: () => import('../views/cidade/CidadeCrudList.vue'),
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router

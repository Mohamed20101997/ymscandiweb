import { createRouter, createWebHistory } from 'vue-router'

import ProductListView from '../views/ProductListView.vue'
import ProductAddView from '../views/ProductAddView.vue'

const routes = [
  {
    path: '/',
    name: 'product-list',
    component: ProductListView
  },
  {
    path: '/product/new',
    name: 'product-add',
    component: ProductAddView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'',
    name:'toolbar',
    component:() => import('../components/Toolbar.vue'),
    children:[
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

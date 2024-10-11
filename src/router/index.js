/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import AccountActivation from '@/components/login/AccountActivation.vue'
import HomePage from '@/components/HomePage.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import CartPage from '@/components/layout/CartPage.vue'
import ProductDetails from '@/components/layout/ProductDetails.vue'
import OrderSummary from '@/components/layout/OrderSummary.vue'
import UserOrders from '@/components/layout/UserOrders.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterForm,
  },
    {
      path: '/activate/:id/:token',
      name: 'Activate',
      component: AccountActivation,
    },
    {
      path: '/cart/',
      name: 'Cart',
      component: CartPage,
    },
    {
      path: '/products/:id',
      name: 'Product',
      component: ProductDetails,
    },
    {
      path: '/summary',
      name: 'Summary',
      component: OrderSummary,
    },
    {
      path: '/orders',
      name: 'Oders',
      component: UserOrders,
    }

]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

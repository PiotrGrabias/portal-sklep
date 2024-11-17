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
import AdminLogin from '@/components/login/AdminLogin.vue'
import AdminSite from '@/components/layout/AdminSite.vue'
import SupportForm from '@/components/layout/SupportForm.vue'
import AboutUs from '@/components/layout/AboutUs.vue'

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
    },
    {
      path: '/jF8r$kL1pWz3Q@h9N7xG2kD!vA6YtO*5bTzLm0s',
      name: 'admin',
      component: AdminLogin,
    },
    {
      path: '/jF8r$kL1pWz3Q@h9N7xG2kD!vA6YtO*5bTzLm0s/admin',
      name: 'adminSite',
      component: AdminSite,
    },
    {
      path: '/support',
      name: 'support',
      component: SupportForm, 
    },
    {
      path: '/about',
      name: 'aboutus',
      component: AboutUs
    }


]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

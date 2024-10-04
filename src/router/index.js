import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Back from '@/views/Backstage/index.vue'
import NotFound from '@/components/404.vue'

import History from '@/views/BackHome/component/History.vue';
import AddProduct from '@/views/BackHome/component/AddProduct.vue';
import Transaction from '@/views/BackHome/component/Transaction.vue';
import Account from '@/views/BackHome/component/Account.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path:'',
          name:'Home',
          component:Home
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/back',
      name: 'Back',
      component: Back,
      children: [
        {
          path: 'history',  // 默认显示的二级路由
          name: 'History',
          component: History
        },
        {
          path: 'addProduct',
          name: 'AddProduct',
          component: AddProduct
        },
        {
          path: 'transaction',
          name: 'Transaction',
          component: Transaction
        },
        {
          path: 'account',
          name: 'Account',
          component: Account
        }
      ]
    },
    { path: '/:pathMatch(.*)*',
      name: 'NotFound', 
      component: NotFound 
    },
  ],
  //跳转路由时，回滚到顶部
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {top:0};
    }
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Back from '@/views/Backstage/index.vue'
import BackHome from '@/views/BackHome/index.vue'

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
      children:[
        {
          path:'',
          name:'BackHome',
          component:BackHome
        },
      ]
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

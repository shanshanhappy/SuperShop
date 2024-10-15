
import router from '@/router/index.js'

//全局前置守卫

router.beforeEach((to, from, next) => {
  //判断是否登录
  if (to.path === '/login') {
    next()
  }
})
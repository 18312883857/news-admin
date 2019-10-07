import Vue from 'vue'
import Router from 'vue-router'
// 引入登录的页面
import Login from './views/login.vue'
import Index from './views/index.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path:'/login',component:Login},
    {path:'/',component:Index}
  ]
})

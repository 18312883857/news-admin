import Vue from 'vue'
import Router from 'vue-router'
// 引入登录的页面
import Login from './views/login.vue'
import Index from './views/index.vue'
// 引入子组件
import Postlist from './components/Postlist.vue'
import Posttext from './components/Posttext.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path:'/login',component:Login},
    {path:'/', meta : '首页' ,component:Index,children:[
      {path:'Postlist',component:Postlist,meta:'文章列表'},
      {path:'Posttext',component:Posttext,meta:'发布文章'}
    ]}
  ]
})

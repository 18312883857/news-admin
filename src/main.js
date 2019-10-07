import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element组件
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios并注册
import axios from 'axios'
// 绑定到原型 
Vue.prototype.$axios = axios
// 设置基准路径
axios.defaults.baseURL = "http://localhost:3000"
// 注册element组件
Vue.use(ElementUI);
// 设置全局路由守卫
router.beforeEach((to,from,next)=>{
  // 判断如果不是登录页，是否有token值
  if(to.path !== '/login'){
    // 如果获取到的userdata是个空值，那么就当成一个空对象 这样就不会报错
    let token = JSON.parse(localStorage.getItem('userdata')||'{}').token
    if(token){
      // 正常跳转
      next()
    }else{
      // 如果没有token就跳转登录面
      next('/login')
    }
  }else{
    // 跳转登录页
    next()
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

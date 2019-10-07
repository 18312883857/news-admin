import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element组件
import ElementUI from 'element-ui'
// 引入element样式
import 'element-ui/lib/theme-chalk/index.css';
// 注册element组件
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

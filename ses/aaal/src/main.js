import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//以上的三行不要动保存原来位置，愿意：引入有序，第三方组件库在下面引入
import './font/iconfont.css'
import 'mint-ui/lib/style.css'
//1.完整引入mint-ui
import MintUI from 'mint-ui'
//引入axios.js文件
import axios from './axios'
//2.单独引入mint-ui样式
Vue.config.productionTip = false
//3.将mint-ui注册vue
Vue.use(MintUI);
//4.判断跳转网页是否需要登陆，如需要判断是否已登录
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin) {
    if (window.sessionStorage.data) {
      next();
    } else {
      next("/login")
    }
  }else{
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

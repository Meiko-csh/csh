import Vue from 'vue'
import Router from 'vue-router'
import index from './components/xm/index.vue'
import login from './components/xm/login.vue'
import reg from './components/xm/reg.vue'
import cart from './components/xm/cart.vue'
import details from './components/xm/details.vue'
import counter from './components/xm/counter.vue'
import admin from './components/xm/admin.vue'
import add_list from './components/xm/add_list.vue'
import pay from './components/xm/pay.vue'
import we from './components/xm/we.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/index',component: index,meta:{needLogin:false}},
    {path: '/login',component: login,meta:{needLogin:false}},
    {path: '/reg',component: reg,meta:{needLogin:false}},
    {path: '/cart',component: cart,meta:{needLogin:true}},
    {path: '/counter',component: counter,meta:{needLogin:true}},
    {path: '/details',component: details,meta:{needLogin:true}},
    {path: '/add_list',component: add_list,meta:{needLogin:true}},
    {path: '/admin',component: admin,meta:{needLogin:true}},
    {path: '/pay',component: pay,meta:{needLogin:false}},
    {path: '/we',component: we,meta:{needLogin:false}},
  ]
})

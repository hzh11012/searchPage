import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//导入全局样式表
import './assets/css/global.css'
import './assets/css/pop.less'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 加入百度统计
router.beforeEach((to, from, next) => {
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  next()
})
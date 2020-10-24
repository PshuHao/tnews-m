import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 导入全局样式
import './assets/css/global.scss'
// 导入vant对应样式
import 'vant/lib/index.css'
// 导入lib-flexible设置基rem准值
import 'amfe-flexible'

// 导入axios模块
// import { axios } from '@/plugins/axios'

// Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 导入全局样式
import './assets/css/global.css'
// 导入vant对应样式
import 'vant/lib/index.css'

Vue.config.productionTip = false
Vue.use(Vant)
// Vue.use(Button)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
Vue.use(Vant)
Vue.config.productionTip = false
import 'amfe-flexible'
import store from '@/store'
import '@/styles/icon.less'
 // import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'G3mqo7AtPHsGsYsYnyzXKpqOdVDbkehu',
// })
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

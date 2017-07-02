import moment from 'moment'
import axios from 'axios'
import NProgress from 'nprogress'
import Vue from 'vue'
import router from './router'
import App from './App'
import 'nprogress/nprogress.css'
import '../static/base.css'

NProgress.configure({ showSpinner: false })
Promise.prototype.done = () => { NProgress.done() }
axios.defaults.baseURL = 'http://localhost:4000/'
axios.start = function () {
  NProgress.start()
  return this
}

Vue.prototype.axios = axios

moment.locale('zh-cn')
Vue.prototype.moment = moment

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

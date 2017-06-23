import Vue from 'vue'
import router from './router'
import App from './App'

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '../static/base.css'
NProgress.configure({ showSpinner: false })

axios.defaults.baseURL = 'http://localhost:4000/'
axios.start = function () {
  NProgress.start()
  return this
}
Promise.prototype.done = () => {
  NProgress.done()
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

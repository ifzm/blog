import Vue from 'vue'
import router from './router'
import App from './App'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000/'
axios.start = function() {
    NProgress.start()
    return this
}
Promise.prototype.done = () => {
    NProgress.done()
}

import '../static/base.css'

document.oncontextmenu = function(e) {
    e.preventDefault()
}

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
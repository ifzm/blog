import Vue from 'vue'
import router from './router'
import App from './App'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000/'

import '../static/base.css'

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
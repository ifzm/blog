import Vue from 'vue'
import router from './router'
import App from './App'

import NProgress from 'nprogress'
import '../static/nprogress.css'

NProgress.configure({ showSpinner: false })

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/'
axios.defaults.transformRequest = [data => {
    NProgress.start()
    return data
}]

axios.defaults.transformResponse = [data => {
    NProgress.done()
    return JSON.parse(data)
}]

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
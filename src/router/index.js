import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/async',
    component: resolve => require(['../components/Async.vue'], resolve)
}]

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})
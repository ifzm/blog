import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/async',
    component: resolve => require(['../components/Async'], resolve)
}, {
    path: '/',
    component: resolve => require(['../components/Posts'], resolve)
}, {
    path: '/post/:id',
    component: resolve => require(['../components/Post'], resolve)
}]

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})
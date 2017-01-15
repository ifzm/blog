import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [{
    path: '/',
    component: resolve => require(['../pages/Index'], resolve),
    children: [{
        path: '/',
        component: resolve => require(['../components/Posts'], resolve),
    }, {
        path: '/post/:id',
        component: resolve => require(['../components/Post'], resolve)
    }]
}, {
    path: '/admin',
    component: resolve => require(['../pages/Admin'], resolve),
    children: [{
        path: '/admin/article',
        name: '发布',
        component: resolve => require(['../pages/Article'], resolve)
    }]
}]

routes.some(route => {
    if (route.path === '/admin') {
        return window.MENUS = route.children
    }
})

export default new VueRouter({
    mode: 'history',
    base: __dirname,
    routes
})
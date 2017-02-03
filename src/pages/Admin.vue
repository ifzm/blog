<template>
    <div id="app">
        <div class="sidebar">
            <sidenav ref="sidenav">
                <div class="header"></div>
                <div class="content">
                    <menu-tree></menu-tree>
                </div>
            </sidenav>
        </div>
        <div class="page">
            <header>
                <div class="navbar-info">
                    <div class="log">

                    </div>
                    <ol class="shortcut">
                        <li :class="{ 'active': shortcut.active }" v-for="(shortcut, index) in shortcuts" @click.stop="shortcutClick(index)">
                            <router-link :to="shortcut.url">
                                <i class="icon" :class="shortcut.icon" v-if="shortcut.icon"></i>{{ shortcut.text }}
                            </router-link>
                        </li>
                    </ol>
                    <div class="info">

                    </div>
                </div>
            </header>

            <main>
                <ol class="breadcrumb" v-show="breadcrumbs.length > 1">
                    <li v-for="(item, index) in breadcrumbs" :class="{'active': index === breadcrumbs.length - 1}">
                        <router-link to="" v-if="index !== breadcrumbs.length - 1">{{ item }}</router-link>
                        <span v-else>{{ item }}</span>
                    </li>
                </ol>
                <transition name="slide-bottom">
                    <router-view class="view"></router-view>
                </transition>
            </main>
        </div>
    </div>
</template>

<script>
    import MenuTree from '../components/MenuTree'
    import Sidenav from '../components/Sidenav'

    export default {
        components: {
            MenuTree,
            Sidenav
        },
        data() {
            console.log(window.MENUS)

            return {
                breadcrumbs: [],
                shortcuts: [{
                    text: '文章',
                    icon: 'icon-wenzhang',
                    url: '/admin/article',
                    active: false
                }, {
                    text: '音乐',
                    icon: 'icon-icon14',
                    url: '/admin',
                    active: false
                }]
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.breadcrumbs.splice(0)
                to.name && to.name.split('/').filter(v => v.trim() !== '' && vm.breadcrumbs.push(v))
            })
        },
        methods: {
            showMenu() {
                this.$refs.sidenav.open()
            },
            shortcutClick(i) {
                this.shortcuts.filter((shortcut, index) => {
                    if (i === index) {
                        shortcut.active = true
                    } else {
                        shortcut.active = false
                    }
                })
            }
        }
    }
</script>

<style lang="css">
    #app {
        display: flex;
        flex: 1;
        flex-flow: column;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }
    
    .page {
        display: flex;
        flex: 1;
        flex-flow: column;
        min-height: 100%;
        max-height: 100%;
    }
    
    .page header {
        z-index: 2;
        display: flex;
        height: 60px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2), 0 1px 1px rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
    }
    
    .page main {
        padding: 10px;
        flex: 1;
        overflow: auto;
    }
    
    .navbar-menu {
        display: inline-block;
        position: fixed;
        width: 220px;
        height: calc(100% - 60px);
        font-size: 12px;
        margin-top: 60px;
        padding: 20px;
        overflow-y: auto;
    }
    
    .navbar-info {
        display: inline-flex;
        position: absolute;
        left: 220px;
    }
    
    .navbar-info .shortcut li {
        display: inline-block;
        position: relative;
        color: #fff;
    }
    
    .navbar-info .shortcut li:after {
        content: " ";
        width: 0;
        height: 3px;
        background-color: #51a351;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    
    .navbar-info .shortcut li.active:after {
        width: 100%;
    }
    
    .navbar-info .shortcut li a {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        color: #555;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    
    .navbar-info .shortcut i.icon {
        vertical-align: middle;
        margin-right: 6px;
        font-size: 1.5em;
    }
    
    .breadcrumb {
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        background-color: #f5f5f5;
        border-radius: 4px;
    }
    
    .breadcrumb li {
        display: inline-block;
    }
    
    .breadcrumb li.active {
        color: #777;
    }
    
    .breadcrumb>li+li:before {
        padding: 0 5px;
        color: #ccc;
        content: "/\00a0";
    }
    
    .breadcrumb a {
        color: #337ab7;
    }
</style>
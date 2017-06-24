<template>
    <div id="app">
        <header>
            <div class="logo">
                LOGO
            </div>
            <div class="nav">
                <ul>
                    <li class="nav-item" :key="index" v-for="(nav, index) in navs" :class="{'active': nav.active}" @click="active(index)">
                        {{ nav.text }}
                    </li>
                </ul>
            </div>
            <div class="tools">
            </div>
        </header>
        <main>
            <transition name="slide-bottom">
                <router-view class="view"></router-view>
            </transition>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navs: [{
                text: '文章',
                router: '/admin/article'
            }, {
                text: '组件示例',
                router: '/admin/article'
            }, {
                text: 'TODO',
                router: '/admin'
            }]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.navs.some((nav, index) => {
                if (nav.router === to.path) {
                    vm.$set(nav, 'active', true)
                    return true
                }
            })
        })
    },
    methods: {
        active(i) {
            this.navs.forEach((nav, index) => {
                if (i === index) {
                    this.$set(nav, 'active', true)
                    this.$router.push(nav.router)
                } else {
                    this.$set(nav, 'active', false)
                }
            })
        }
    }
}
</script>

<style lang="css">
#app {
    display: flex;
    flex-flow: column;
}

header {
    display: flex;
    flex-flow: row;
    width: 100%;
    height: 62px;
    background-color: #324057;
    color: white;
}

header>div {
    flex: 1;
    display: flex;
    align-items: center;
}

header .logo {
    flex: 0 0 150px;
    justify-content: center;
    font-size: 1.5rem;
}

header .tools {
    flex: 0 0 120px;
}

header .nav ul {
    height: 100%;
}

header .nav-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 1.5rem;
    cursor: pointer;
    color: #ccc;
}

header .nav-item.active,
header .nav-item:hover {
    color: white;
}

header .nav-item.active:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #ccc;
}

main {
    padding: 20px 10px;
    overflow: auto;
}
</style>

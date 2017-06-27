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
                        <span v-if="nav.tip" class="nav-item-tip">{{ nav.tip }}</span>
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
                router: '/admin/compents'
            }, {
                text: 'TODO',
                router: '/admin',
                tip: '6'
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
    z-index: 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
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

.nav .nav-item {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 100%;
    padding: 0 1.5rem;
    cursor: pointer;
    color: #ccc;
    transition: all .5s cubic-bezier(.55, 0, .1, 1);
}

.nav .nav-item.active,
.nav .nav-item:hover {
    color: white;
}

.nav .nav-item.active:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: #ccc;
}

.nav .nav-item-tip {
    position: absolute;
    top: 10px;
    right: 4px;
    background-color: #ca4236;
    font-size: 0.8em;
    color: #e8e5e5;
    border-radius: 4px;
    padding: 0 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
}

main {
    flex: 1;
    padding: 10px;
    overflow: auto;
    position: relative;
}
</style>

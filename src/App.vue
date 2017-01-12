<template>
    <div id="app">
        <main>
            <div class="about">
                <div class="avatar">
                    <img src="./assets/avatar.jpg" alt="avatar">
                </div>
                <div class="name">{{ name }}</div>
                <div class="motto">{{ motto }}</div>
            </div>
            <div class="centent">
                <transition name="slide-bottom">
                    <router-view class="view"></router-view>
                </transition>
            </div>
        </main>
    </div>
</template>

<script>
    import '../static/base.css'
    import 'highlight.js/styles/color-brewer.css'
    import HeaderBar from './components/HeaderBar'

    export default {
        data() {
            return {
                name: '小明的日常随记',
                motto: '什么时候才能认真做好一件事啊，@#$%^&*~...'
            }
        },
        components: {
            HeaderBar
        }
    }
</script>

<style lang="css">
    main {
        padding: 10px;
    }
    
    .view {
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        max-width: 650px;
        transition: all .5s cubic-bezier(.55, 0, .1, 1);
    }
    
    .err {
        color: #f44336;
    }
    
    .slide-bottom-enter {
        opacity: 0;
        -webkit-transform: translate(0, 30px);
        transform: translate(0, 30px);
    }
    
    .slide-bottom-leave-active {
        opacity: 0;
        -webkit-transform: translate(0, 30px);
        transform: translate(0, 30px);
    }
    
    .about div {
        margin: 10px auto;
        text-align: center;
    }
    
    .about .avatar {
        width: 90px;
        height: 90px;
    }
    
    .about .avatar img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    
    .about .name {
        font-weight: 600;
        color: #333;
    }
    
    .about .motto {
        color: #888;
        font-size: .8em;
    }
    
    .post-item {
        padding: 30px 0;
    }
    
    .post-item .title {
        color: #333;
        font-size: 1.3em;
        font-weight: bold;
    }
    
    .post-item .item-meta {
        font-size: .8em;
        color: #999;
        padding: 15px 0;
    }
    
    .post-item .meta-left {
        float: left;
    }
    
    .post-item .meta-right {
        float: right;
    }
    
    .bull {
        margin: 0 2px;
    }
</style>
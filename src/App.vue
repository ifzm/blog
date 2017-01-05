<template>
    <div id="app">
        <header-bar></header-bar>

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
    import HeaderBar from './components/HeaderBar'

    export default {
        data() {
            return {
                name: '小明的日常随记',
                motto: '什么时候才能认真做好一件事啊，~!@#$%^&*。'
            }
        },
        components: {
            HeaderBar
        }
    }
</script>

<style lang="css">
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    html, body {
        letter-spacing: 0;
        font-family: "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif;
        font-size: 1em;
        color: #333;
    }

    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        clear: both;
        content: '.';
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
    }

    a {
        outline-style: none;
        text-decoration: none;
        color: gray;
    }

    a:hover {
        color: #333;
    }

    main {
        padding: 10px;
    }

    .view {
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        padding: 20px 0;
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
        font-size: 1.2em;
    }

    .about .motto {
        color: #888;
    }

    .centent {
        padding: 30px 10px;
    }
</style>
<template>
    <main>
        <section class="about">
            <div class="avatar">
                <img src="../assets/avatar.jpg" alt="avatar">
            </div>
            <div class="name">{{ name }}</div>
            <div class="motto">{{ motto }}</div>
        </section>
        <section class="centent">
            <transition name="slide-bottom">
                <router-view class="view"></router-view>
            </transition>
        </section>
    </main>
</template>

<script>
    import 'highlight.js/styles/color-brewer.css'

    export default {
        data() {
            return {
                name: '小明的日常随记',
                motto: '什么时候才能认真做好一件事啊，@#$%^&*~...'
            }
        }
    }
</script>

<style scoped>
    main {
        padding: 10px;
        height: 100%;
        overflow-y: auto;
    }

    .view {
        margin: auto;
        max-width: 650px;
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
</style>

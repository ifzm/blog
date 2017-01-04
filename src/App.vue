<template>
    <div>
        <p>{{ text }}</p>
        <div>
            <input type="text" v-model="text">
            <router-link to="/ha">haha</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                text: 'welcome use Vue.js ！'
            }
        }
    }
</script>

<style lang="css">
    p {
        color: #666;
    }
</style>
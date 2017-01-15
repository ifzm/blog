<template>
    <div>
        <router-link :to="item.path" v-for="item in menus">
            {{ item.name }}
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'menu-tree',
        props: {
            model: Array
        },
        data() {
            return {
                open: false,
                menus: window.MENUS
            }
        },
        methods: {
            toggle() {
                this.open = !this.open
            }
        }
    }
</script>

<style lang="css">

</style>
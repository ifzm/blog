<template>
    <ul class="menu">
        <item v-for="item in items" :value="item.value" :selected="~values.indexOf(item.value)">{{ item.text }}</item>
        <slot v-if="!items"></slot>
    </ul>
</template>

<script>
    import Item from './Item'

    export default {
        name: 'menu',
        components: {
            Item
        },
        props: {
            items: Array,
            style: String
        },
        data() {
            return {

            }
        },
        methods: {
            select(value) {
                this.$emit('select', value)
            }
        }
    }
</script>

<style lang="css">
    .menu {
        z-index: 2;
        position: absolute;
        border-radius: 2px;
        background-color: white;
        box-shadow: 3px 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
</style>
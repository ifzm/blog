<template>
    <ul class="menu">
        <item v-for="item in items" :item="item" :selected="values.indexOf(item.value) !== -1" @select="select">
            <m-menu 
                :items="item.children" 
                :values="values"
                v-if="item.children" 
                v-show="item.open" 
                class="sub" 
                @select="select">
            </m-menu>
        </item>
        <slot v-if="!items"></slot>
    </ul>
</template>

<script>
    import Item from './Item'

    export default {
        name: 'm-menu',
        components: {
            Item
        },
        props: {
            items: Array,
            style: String,
            class: String,
            values: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                showSubMenu: false
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
        background-color: white;
        box-shadow: 3px 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
    
    .menu.sub {
        top: 0;
        left: 150px;
        box-shadow: 3px 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
</style>
<template>
    <li class="item">
        <a @click.prevent="select(value || item.value)">
            <i class="icon item-icon" :class="item.icon" v-if="item && item.icon"></i>
            <span class="item-text">{{ text || item && item.text }}</span>
            <i class="icon icon-check" :style="iconCheckStyle"></i>
        </a>
        <n-menu v-if="item.children"></n-menu>
        <slot></slot>
    </li>
</template>

<script>
    import Menu from './Menu'

    export default {
        components: {
            nMenu: Menu
        },
        props: {
            item: Object,
            text: String,
            value: null,
            selected: Boolean
        },
        data() {
            return {
                checked: this.selected
            }
        },
        computed: {
            iconCheckStyle() {
                return 'visibility: ' + (this.checked ? 'visible' : 'hidden')
            }
        },
        methods: {
            select(value) {
                if (!this.$children) {
                    this.checked = !this.checked
                    this.$emit('select', value)
                }
            }
        }
    }
</script>

<style lang="css">
    .item {
        min-width: 150px;
        height: 30px;
        padding: 3px 10px;
    }
    
    .item a {
        color: #444;
        cursor: pointer;
        display: flex;
        flex: 1;
        flex-flow: row;
        align-items: center;
        justify-content: space-between;
    }
    
    .item:hover {
        background-color: #f4f4f4;
    }
    
    .item .item-text {
        overflow: hidden;
        margin: 0 8px;
        flex: 99;
    }
</style>
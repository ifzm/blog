<template>
    <li class="item" @click.stop="check(value || item.value)" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <i class="icon item-icon" :class="item.icon" v-if="item && item.icon"></i>
        <span class="item-text">
            {{ item && item.text }}
            <slot></slot>
        </span>
        <i class="icon" :class="icon" :style="iconCheckStyle"></i>
    </li>
</template>

<script>
    export default {
        props: {
            item: Object,
            value: null,
            selected: Boolean
        },
        data() {
            return {
                checked: this.selected,
                icon: 'icon-check'
            }
        },
        computed: {
            iconCheckStyle() {
                return 'visibility: ' + (this.selected || this.checked ? 'visible' : 'hidden')
            }
        },
        mounted() {
            if (this.$children.length > 0) {
                this.checked = true
                this.icon = 'icon-triange_right'
            }
        },
        methods: {
            check(value) {
                if (this.$children.length === 0) {
                    this.select(value)
                }
            },
            select(value) {
                this.$emit('select', value)
            },
            mouseenter(e) {
                this.$set(this.item, 'open', true)
            },
            mouseleave(e) {
                this.$set(this.item, 'open', false)
            }
        }
    }
</script>

<style lang="css">
    .item {
        min-width: 150px;
        height: 30px;
        padding: 3px 10px;
        color: #444;
        cursor: pointer;
        display: flex;
        flex: 1;
        flex-flow: row;
        justify-content: space-between;
        position: relative;
    }
    
    .item:hover {
        background-color: #f4f4f4;
    }
    
    .item .item-text {
        overflow: hidden;
        margin: 0 8px;
        flex: 99;
        line-height: 26px;
    }
</style>
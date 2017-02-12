<template>
    <li class="item" @click.stop="check(value || item.value)" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <i class="item-icon" :class="iconClass"></i>
        <span class="item-text">
            {{ item && item.text }}
            <slot></slot>
        </span>
        <i class="icon icon-check" :class="icon" :style="iconCheckStyle" v-if="showCheckIcon"></i>
    </li>
</template>

<script>
    export default {
        props: {
            item: Object,
            value: null,
            showCheckIcon: Boolean,
            selected: Boolean
        },
        data() {
            return {
                checked: this.selected,
                icon: 'icon-check'
            }
        },
        computed: {
            iconClass() {
                return this.item.icon ? 'icon ' + this.item.icon : ''
            },
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
        background-color: white;
        transition: all .3s cubic-bezier(.25, .8, .25, 1);
    }
    
    .item:hover {
        background-color: #ececec;
    }
    
    .item .item-text {
        overflow: hidden;
        margin: 0 8px;
        line-height: 26px;
        flex-grow: 1;
    }
    
    .item .icon {
        flex-basis: 16px;
    }
    
    .item+.item>.item-icon {
        flex-basis: 16px;
    }
</style>
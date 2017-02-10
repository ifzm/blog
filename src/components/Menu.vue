<template>
    <ul class="menu" v-show="show">
        <item v-for="item in items" :item="item" :selected="checkValues.indexOf(item.value) !== -1" @select="select">
            <m-menu 
                :items="item.children" 
                :values="checkValues"
                :multiple="multiple"
                v-if="item.children" 
                v-show="item.open" 
                class="sub">
            </m-menu>
        </item>
        <slot v-if="!items"></slot>
    </ul>
</template>

<script>
    import clickoutside from '../utils/clickoutside'
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
            multiple: Boolean,
            values: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                show: false,
                showSubMenu: false,
                checkValues: this.values
            }
        },
        methods: {
            toggle() {
                this.show = !this.show
                clickoutside.call(this, 'show', 'toggle')
            },
            select(value) {
                if (this.multiple) {
                    let index = this.checkValues.indexOf(value)
                    index === -1 ? this.checkValues.push(value) : this.checkValues.splice(index, 1)
                } else {
                    this.checkValues = []
                    this.checkValues.push(value)
                }
                this.$emit('select', this.checkValues)
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
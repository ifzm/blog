<template>
    <ul class="menu" :class="{'is-icon' : hasIcon}" v-show="active">
        <item
            v-for="item in items"
            @select="select"
            :item="item"
            :selected="checkValues.indexOf(item.value) !== -1"
            :showCheckIcon="showCheckIcon">
            <m-menu
                :items="item.children"
                :values="checkValues"
                :multiple="multiple"
                :showCheckIcon="showCheckIcon"
                v-if="item.children"
                v-show="item.open">
            </m-menu>
        </item>
        <slot v-if="!items"></slot>
    </ul>
</template>

<script>
    import Utils from '../utils'
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
            params: null,
            showCheckIcon: Boolean,
            clickoutside: Function,
            values: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                active: false,
                hasIcon: false,
                checkValues: this.values
            }
        },
        methods: {
            toggle(show) {
                this.active = show !== undefined ? show : !this.active
                Utils.clickoutside.call(this, this.active, e => {
                    this.clickoutside && this.clickoutside()
                    this.active = false
                })
            },
            select(value) {
                if (this.multiple) {
                    let index = this.checkValues.indexOf(value)
                    index === -1 ? this.checkValues.push(value) : this.checkValues.splice(index, 1)
                } else {
                    this.checkValues.splice(0, this.checkValues.length)
                    this.checkValues.push(value)
                    Utils.clickoutside()
                }

                this.$emit('select', this.checkValues, this.params)
            }
        }
    }
</script>

<style lang="css">
    .menu {
        z-index: 2;
        position: absolute;
        background-color: white;
        /*border: 1px solid #ececec;*/
        /*box-shadow: 0 0 0 rgba(0, 0, 0, .2), 0 0 0 rgba(0, 0, 0, .14), 3px 3px 10px -2px rgba(0, 0, 0, .12);*/
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
    
    .menu .menu {
        top: 0;
        left: 100%;
    }
    
    .menu.is-icon>.item>.item-icon {
        flex-basis: 16px;
    }
</style>
<template>
    <div class="select">
        <button class="select-container" :class="classes" @click="toggle">
            <span class="select-placeholder">{{ placeholder }}</span>
            <span class="select-selectedItems">{{ selectedItems }}</span>
            <i class="icon icon-xiangxia-copy"></i>
        </button>
        <m-menu 
            @select="select"
            :items="items" 
            :values="values"
            :style="menuStyle"
            v-show="showMenu" 
            v-if="items">
        </m-menu>
    </div>
</template>

<script>
    import Menu from './Menu'
    import Item from './Item'

    export default {
        components: {
            MMenu: Menu,
            Item
        },
        props: {
            items: Array,
            values: {
                type: Array,
                default: () => []
            },
            multiple: Boolean,
            placeholder: {
                type: String,
                default: 'Nothing Selected'
            }
        },
        data() {
            return {
                showMenu: false
            }
        },
        computed: {
            classes() {
                return {
                    active: this.showMenu
                }
            },
            menuStyle() {
                return `left: 0; top: 34px;`
            },
            selectedItems() {
                return this.values.join(', ')
            }
        },
        methods: {
            toggle() {
                this.showMenu = !this.showMenu
            },
            select(value) {
                if (this.multiple) {
                    let index = this.values.indexOf(vlaue)
                    index === -1 ? this.values.push(value) : this.values.splice(index, 1)
                } else {
                    this.values = []
                    this.values.push(value)
                    this.showMenu = false
                }
            }
        }
    }
</script>

<style lang="css">
    .select {
        position: relative;
        display: inline-block;
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
    
    .select .select-container {
        cursor: pointer;
        height: 30px;
        padding: 0 10px;
        border: 0;
        border-radius: 2px;
        background: white;
        transition: all .4s cubic-bezier(.25, .8, .25, 1);
        display: flex;
        flex: 1;
        flex-flow: row;
        align-items: center;
    }
    
    .select .select-container.active {
        background: #bdbdbd;
    }
    
    .select .select-container .icon {
        margin-left: 10px;
    }
</style>
<template>
    <div class="select">
        <button class="select-container" :class="{'active': active}" @click="toggle">
            <span class="select-placeholder" v-show="!selectedItems">{{ placeholder }}</span>
            <span class="select-selectedItems" v-show="selectedItems">{{ selectedItems }}</span>
            <i class="icon icon-xiangxia-copy"></i>
        </button>
        <m-menu
            ref="selectMenu"
            @select="select"
            @toggle="toggle"
            :items="items"
            :values="checkValues"
            :style="menuStyle"
            :multiple="multiple"
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
            multiple: Boolean,
            values: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: '请选择'
            }
        },
        data() {
            return {
                active: false,
                checkValues: this.values
            }
        },
        computed: {
            menuStyle() {
                return `left: 0; top: 34px;`
            },
            selectedItems() {
                return this.checkValues.join(', ')
            }
        },
        methods: {
            toggle(show) {
                this.active = show === false ? false : !this.active
                this.$refs.selectMenu.toggle(show)
            },
            select(values) {
                if (!this.multiple) {
                    this.$refs.selectMenu.toggle()
                }
                this.checkValues = values
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
        display: flex;
        flex: 1;
        flex-flow: row;
        align-items: center;
        cursor: pointer;
        height: 30px;
        padding: 0 10px;
        border: 0;
        border-radius: 2px;
        background: white;
        transition: all .4s cubic-bezier(.25, .8, .25, 1);
    }
    
    .select .select-container.active {
        background: #bdbdbd;
    }
    
    .select .select-container .icon {
        margin-left: 10px;
    }
</style>
<template>
    <div class="editor" :class="classes">
        <div class="editor-toolbar">
            <span>B</span><span>I</span>
        </div>
        <div class="editor-container">
            <textarea 
                ref="textarea"
                :name="name" 
                :placeholder="placeholder" 
                v-model="content"
                @input="onInput"
                @contextmenu="contextmenu" 
                @keydown.prevent.tab="onPressTab"
                @focus="focus = true"
                @blur="focus = false"
                spellcheck="false">
            </textarea>
            <m-menu ref="rightMenu" :items="rightMenus" :style="menuStyle"></m-menu>
        </div>
    </div>
</template>

<script>
    import Dropzone from 'dropzone'
    import Utils from '../utils'
    import Menu from '../components/Menu'

    export default {
        components: {
            MMenu: Menu
        },
        props: {
            name: String,
            value: String,
            placeholder: {
                type: String,
                default: '请输入...'
            },
            rightMenus: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                content: this.value,
                focus: false,
                menuStyle: ''
            }
        },
        computed: {
            classes() {
                return {
                    'editor-focus': this.focus
                }
            }
        },
        mounted() {
            this.$el.addEventListener('drop', (e) => {
                if (e.dataTransfer.files.length > 0) {
                    e.preventDefault()

                    e.target.focus()
                    Utils.insertAtCursor.call(e.target, '\naaa')
                    this.content = e.target.value
                    e.target.focus()
                }
            }, false)
        },
        methods: {
            contextmenu(e) {
                this.menuStyle = `left: ${e.clientX}px; top: ${e.clientY}px;`
                this.$refs.rightMenu.toggle(true)
            },
            onPressTab(e) {
                Utils.insertAtCursor.call(e.currentTarget, '  ')
            },
            onInput(e) {
                this.$emit('input', this.content, e)
            }
        }
    }
</script>

<style lang="css" scoped>
    .editor {
        width: 100%;
        border: 2px solid #ccc;
        border-radius: 2px;
        transition: all .5s;
        background-color: white;
    }
    
    .editor.editor-focus {
        border-color: #51a351;
    }
    
    .editor-toolbar {
        width: 100%;
        height: 30px;
        line-height: 26px;
        padding: 2px 7px;
        border-bottom: 1px solid #eae9e9;
    }
    
    .editor-container {
        display: flex;
        padding: 5px 0;
    }
    
    .editor textarea {
        border: 0 none !important;
        border-radius: 0 !important;
    }
    
    .editor textarea:focus,
    .editor textarea:active {
        border-color: none !important;
    }
</style>
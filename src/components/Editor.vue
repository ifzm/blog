<template>
    <div class="editor" :class="classes">
        <div class="editor-toolbar">
            <button 
                class="fa" 
                :class="toolbar.icon"
                v-for="toolbar in toolbars" 
                @click.stop="toolbar.handler">
            </button>
        </div>
        <div class="editor-container">
            <textarea 
                ref="editor"
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
            let self = this

            return {
                content: this.value,
                focus: false,
                menuStyle: '',
                toolbars: [{
                    icon: 'fa-bold',
                    handler(e) {
                        self.insertString(self.$refs.editor, ' **粗体** ', 3, 2)
                    }
                }, {
                    icon: 'fa-italic',
                    handler(e) {
                        self.insertString(self.$refs.editor, ' *斜体* ', 2, 2)
                    }
                }, {
                    icon: 'fa-code',
                    handler(e) {
                        self.insertString(self.$refs.editor, ' `` ', 2)
                    }
                }, {
                    icon: 'fa-photo',
                    handler(e) {
                        self.insertString(self.$refs.editor, ' `` ', 2)
                    }
                }]
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
                    this.insertString(e.target, `\n![Uploading...](${e.dataTransfer.files[0].name})\n`)
                }
            }, false)
        },
        methods: {
            contextmenu(e) {
                this.menuStyle = `left: ${e.clientX}px; top: ${e.clientY}px;`
                this.$refs.rightMenu.toggle(true)
            },
            onPressTab(e) {
                this.insertString(e.currentTarget, '  ')
            },
            onInput(e) {
                this.$emit('input', this.content, e)
            },
            insertString(target, str, move = 0, selects = 0) {
                Utils.insertAtCursor.call(target, str)
                this.content = target.value
                this.onInput()
                target.focus()

                target.setSelectionRange(target.selectionEnd - move - selects, target.selectionEnd - move)
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
        line-height: 25px;
        padding: 2px 7px;
        border-bottom: 1px solid #eae9e9;
    }

    .editor-toolbar > button {
        width: 19px;
        height: 19px;
        line-height: 19px;
        text-align: center;
        border: 0 none;
        background-color: white;
        transition: all .5s;
    }

    .editor-toolbar > button:hover {
        background-color: #d6d3d3;
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
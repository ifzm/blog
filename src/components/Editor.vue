<template>
    <div class="editor" :class="classes">
        <div class="editor-toolbar">
            <button v-for="(toolbar, index) in toolbars" :key="index" @click.stop="toolbar.handler">
                <!--<icon :href="toolbar.icon"></icon>-->
                <i class="icon" :class="toolbar.icon"></i>
            </button>
        </div>
        <div class="editor-container">
            <textarea
                ref="editor"
                :name="name"
                :placeholder="placeholder"
                v-model="content"
                @input="response"
                @contextmenu="contextmenu"
                @keydown.prevent.tab="onPressTab"
                @focus="focus = true"
                @blur="focus = false"
                @paste="paste"
                spellcheck="false">
            </textarea>
            <m-menu ref="rightMenu" :items="rightMenus" :style="menuStyle"></m-menu>
        </div>
    </div>
</template>

<script>
    import Utils from '../utils'
    import Menu from '../components/Menu'
    import Icon from '../components/Icon'

    export default {
        components: {
            Icon,
            MMenu: Menu
        },
        props: {
            name: String,
            value: String,
            action: String,
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
                    icon: 'icon-bold',
                    handler(e) {
                        self.insertString(self.$refs.editor, '**粗体**', 2, 2)
                    }
                }, {
                    icon: 'icon-italic',
                    handler(e) {
                        self.insertString(self.$refs.editor, '_斜体_', 1, 2)
                    }
                }, {
                    icon: 'icon-code',
                    handler(e) {
                        self.insertString(self.$refs.editor, '``', 1)
                    }
                }, {
                    icon: 'icon-img',
                    handler(e) {
                        self.insertString(self.$refs.editor, '`` ', 1)
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

                    if (!!this.action) {
                        this.upload(e)
                    } else {
                        throw new Error('Props `action` must be specified when using upload function.')
                    }
                }
            }, false)

            // 右键菜单
            if (this.rightMenus.length > 0) {
                this.$refs.editor.oncontextmenu = function(e) {
                    e.preventDefault()
                }
            }
        },
        methods: {
            paste(e) {
                console.log(e)
            },
            contextmenu(e) {
                this.menuStyle = `left: ${e.clientX}px; top: ${e.clientY}px;`
                this.$refs.rightMenu.toggle(true)
            },
            onPressTab(e) {
                this.insertString(e.currentTarget, '  ')
            },
            response(content) {
                if (typeof content === 'string') {
                    this.content = content
                }
                this.$emit('input', this.content)
                this.$refs.editor.focus()
            },
            insertString(target, str, move = 0, selects = 0) {
                Utils.insertAtCursor.call(target, str)
                this.response(target.value)

                target.setSelectionRange(target.selectionEnd - move - selects, target.selectionEnd - move)
            },
            upload(e) {
                let self = this,
                    xhr = new XMLHttpRequest(),
                    formData = new FormData()

                for (let file of e.dataTransfer.files) {
                    formData.append('file', file)
                    this.insertString(e.target, `\n![Uploading...](${file.name})\n`)
                }

                xhr.onload = function() {
                    let files = JSON.parse(this.responseText),
                        preview = self.content

                    files.forEach(file => {
                        preview = preview.replace(new RegExp(`\\!\\[Uploading...\\]\\(${file.originalname}\\)`, 'm'), `![image](${file.filename})`)
                    })

                    self.response(preview)
                }
                xhr.open('post', this.action)
                xhr.send(formData)
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

    .editor-toolbar>button {
        width: 27px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 0 none;
        background-color: white;
        transition: all .5s;
    }

    .editor-toolbar>button:hover {
        background-color: #d6d3d3;
    }

    .editor-toolbar .icon {
        font-size: 17px !important;
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

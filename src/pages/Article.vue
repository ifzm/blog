<template>
    <div class="post-create">
        <div class="create-left">
            <form class="form success" action="" onsubmit="return false">
                <div class="control-group">
                    <input type="text" placeholder="标题" v-model="title">
                </div>
                <div class="control-group">
                    <editor
                        v-model="content"
                        action="http://localhost:4000/upload"
                        :rightMenus="menuItems">
                    </editor>
                </div>
                <div class="control-group">
                    <m-select :items="selectItems" multiple></m-select>
                    <m-select :items="selectItems"></m-select>
                </div>
                <div class="control-group">
                    <checkbox checked class="success">足球</checkbox>
                    <checkbox checked>篮球</checkbox>
                    <checkbox>棒球</checkbox>
                    <checkbox checked disabled>乒乓球</checkbox>
                    <checkbox disabled>网球</checkbox>
                </div>
                <div class="control-group">
                    <radio v-model="sex" name="sex" values="1">男</radio>
                    <radio v-model="sex" name="sex" values="0">女</radio>
                    <radio v-model="sex" name="sex" values="2" disabled>其他</radio>
                </div>
                <div class="control-group">
                    <m-switch checked>Default</m-switch>
                    <m-switch class="success">Success</m-switch>
                    <m-switch disabled>Disabled</m-switch>
                </div>
                <div class="control-group">
                    <button class="button success shadow" @click="save()">
                        保存
                    </button>
                </div>
            </form>
        </div>
        <div class="create-right markdown" v-html="getContent"></div>

        <modal ref="dialog" @close="close"></modal>
    </div>
</template>

<script>
    import Modal from '../components/Modal'
    import Checkbox from '../components/Checkbox'
    import Radio from '../components/Radio'
    import Switch from '../components/Switch'
    import Select from '../components/Select'
    import Menu from '../components/Menu'
    import Editor from '../components/Editor'

    import NProgress from 'nprogress'
    import axios from 'axios'
    import marked from 'marked'
    import hljs from 'highlight.js'
    import Utils from '../utils'

    marked.setOptions({
        breaks: true,
        highlight(code) {
            return hljs.highlightAuto(code).value
        }
    })

    export default {
        components: {
            Checkbox,
            Modal,
            Radio,
            Editor,
            MSwitch: Switch,
            MSelect: Select,
            MMenu: Menu
        },
        data() {
            return {
                sex: 1,
                title: '',
                content: '',
                processing: false,
                selectItems: [{
                    text: 'GitHub1',
                    value: 'GitHub1',
                    icon: 'icon-github'
                }, {
                    text: 'MENU1',
                    value: 'MENU1',
                    icon: 'icon-menu',
                    children: [{
                        text: 'GitHub2GitHub2GitHub2GitHub2GitHub2GitHub2GitHub2',
                        value: 'GitHub2',
                        icon: 'icon-github'
                    }, {
                        text: 'GitHub5',
                        value: 'GitHub5'
                    }, {
                        text: 'MENU2',
                        value: 'MENU2',
                        icon: 'icon-menu',
                        children: [{
                            text: 'GitHub3',
                            value: 'GitHub3',
                            icon: 'icon-github'
                        }]
                    }]
                }],
                menuItems: [{
                    text: 'Copy',
                    value: 'Copy'
                }, {
                    text: 'Paste',
                    value: 'Paste',
                    icon: 'icon-paste'
                }],
                menuStyle: ''
            }
        },
        computed: {
            getContent() {
                return marked(this.content)
            }
        },
        methods: {
            tab(e) {
                Utils.insertAtCursor.call(e.currentTarget, '  ')
            },
            showRightMenu(e) {
                this.menuStyle = `left: ${e.clientX}px; top: ${e.clientY}px;`
                this.$refs.rightMenu.toggle(true)
            },
            close(type) {
                // alert(type)
            },
            save() {
                this.$refs.dialog.open({
                    title: '🚀Post created!',
                    content: '&#x1F469;⚡️🚴Your post <strong>Material Design is awesome</strong> has been created.',
                    confirm: '确认',
                    cancel: '取消'
                })

                return

                axios.start()
                    .post('post', {
                        title: this.title,
                        content: this.content
                    })
                    .then(res => {
                        alert(res.data.message)
                    })
                    .catch(err => {
                        this.err = err
                    })
                    .done()
            }
        }
    }
</script>

<style lang="css">
    .form {
        padding: 20px;
        background: #eaeaea;
    }

    .form .control-group {
        margin-bottom: 15px;
    }

    .form input,
    .form textarea {
        border: 2px solid #ccc;
        padding: 7px;
        border-radius: 2px;
        transition: all .5s;
        resize: none;
        width: 100%;
    }

    .form textarea {
        min-height: 220px;
        overflow-x: hidden;
    }

    input:focus,
    input:active,
    textarea:focus,
    textarea:active {
        border-color: rgba(0, 0, 0, 0.26);
    }

    .form.success input:focus,
    .form.success input:active,
    .form.success textarea:focus,
    .form.success textarea:active,
    input.success:focus,
    input.success:active,
    textarea.success:focus,
    textarea.success:active {
        border-color: #51a351;
    }

    .form.primary input:focus,
    .form.primary input:active,
    .form.primary textarea:focus,
    .form.primary textarea:active,
    input.primary:focus,
    input.primary:active,
    textarea.primary:focus,
    textarea.primary:active {
        border-color: #2196f3;
    }

    .button {
        min-width: 80px;
        min-height: 32px;
        line-height: 32px;
        padding: 0 15px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        background: none;
        border: 0;
        border-radius: 2px;
        text-align: center;
        font-weight: 500;
        transition: all 1s cubic-bezier(.25, .8, .25, 1);
    }

    .button:hover,
    .button:active,
    .button:focus {
        background-color: hsla(0, 0%, 60%, .2);
        text-decoration: none;
    }

    .button.shadow {
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }

    .button.default {
        color: black;
        background-color: #ffffff;
    }

    .button.success {
        color: white;
        background-color: #5bb75b;
    }

    .button.success:hover,
    .button.success:active,
    .button.success:focus {
        background-color: #51a351;
    }

    .button.primary {
        color: white;
        background-color: #2196f3;
    }

    .button.primary:hover,
    .button.primary:active,
    .button.primary:focus {
        background-color: #1e88e5;
    }

    .button.icon-button {
        width: 40px;
        min-width: 40px;
        min-height: 40px;
        border-radius: 50%;
        padding: 0 8px;
        color: white;
    }

    .button.icon-button>i.icon {
        font-size: 1.7em;
    }

    .post-create {
        display: flex;
        flex-flow: row wrap;
        padding-left: 10px;
    }

    .create-left,
    .create-right {
        flex-basis: calc(50% - 10px);
        margin-right: 10px;
    }

    .create-right {
        border: 2px dashed #ccc;
        padding: 10px;
        word-wrap: break-word;
        word-break: break-all;
    }
</style>

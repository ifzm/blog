<template>
    <div class="post-create">
        <div class="create-left">
            <form class="form success" action="" onsubmit="return false">
                <div class="control-group">
                    <input type="text" placeholder="标题" v-model="title">
                </div>
                <div class="control-group">
                    <textarea placeholder="内容" v-model="content" spellcheck="false"></textarea>
                </div>
                <div class="control-group">
                    <checkbox checked class="success">足球</checkbox>
                    <checkbox checked>篮球</checkbox>
                    <checkbox>棒球</checkbox>
                    <checkbox checked disabled>乒乓球</checkbox>
                    <checkbox disabled>网球</checkbox>
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

    import NProgress from 'nprogress'
    import axios from 'axios'
    import marked from 'marked'
    import hljs from 'highlight.js'


    marked.setOptions({
        breaks: true,
        highlight(code) {
            return hljs.highlightAuto(code).value
        }
    })

    export default {
        components: {
            Checkbox,
            Modal
        },
        data() {
            return {
                title: '',
                content: '',
                processing: false
            }
        },
        computed: {
            getContent() {
                return marked(this.content)
            }
        },
        methods: {
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

                if (this.processing) return
                this.processing = true

                NProgress.start()
                axios.post('post', {
                        title: this.title,
                        content: this.content
                    })
                    .then(res => {
                        alert(res.data.message)
                    })
                    .catch(err => {
                        this.err = err
                    })
                    .then(() => {
                        NProgress.done()
                        this.processing = false
                    })
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
        border: 2px solid white;
        padding: 7px;
        border-radius: 2px;
        transition: all .5s;
        resize: none;
        width: 100%;
    }
    
    .form textarea {
        min-height: 220px;
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
        transition: all .4s cubic-bezier(.25, .8, .25, 1);
        text-align: center;
        font-weight: 500;
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
    
    .post-create {
        display: flex;
        flex-flow: row wrap;
        padding-left: 10px;
    }
    
    .create-left,
    .create-right {
        flex: 1 1 calc(50% - 10px);
        margin-right: 10px;
    }
    
    .create-right {
        border: 2px dashed #ccc;
    }
</style>
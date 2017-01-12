<template>
    <div class="clearfix post-create">
        <div class="create-left">
            <form class="form" action="" onsubmit="return false">
                <div class="control-group">
                    <input type="text" placeholder="标题" v-model="title">
                </div>
                <div class="control-group">
                    <textarea placeholder="内容" v-model="content" spellcheck="false"></textarea>
                </div>
                <div class="control-group">
                    <button class="btn btn-success" @click="save()">保存</button>
                </div>
            </form>
        </div>
        <div class="create-right markdown" v-html="getContent"></div>
    </div>
</template>

<script>
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
            save() {
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
    .post-create {
        min-width: 1200px;
    }
    
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
        transition: all .3s;
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
        border-color: #51a351;
    }
    
    .btn {
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
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2), 0 2px 2px rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .12);
    }
    
    .btn-default {
        color: black;
        background-color: #ffffff;
    }
    
    .btn-success {
        color: white;
        background-color: #5bb75b;
    }
    
    .btn-success:hover,
    .btn-success:active,
    .btn-success:focus {
        background-color: #51a351;
    }
    
    .btn-primary {
        color: white;
        background-color: #2196f3;
    }
    
    .btn-primary:hover,
    .btn-primary:active,
    .btn-primary:focus {
        background-color: #1e88e5;
    }
    
    .create-left {
        float: left;
        width: calc(50% - 5px);
    }
    
    .create-right {
        float: right;
        width: calc(50% - 5px);
        border: 2px dashed #ccc;
        min-height: 371px;
        padding: 20px;
    }
</style>
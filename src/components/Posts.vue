<template>
    <section>
        <div class="block-title">
            <span>最新文章</span>
        </div>
        <ul class="post-list">
            <li class="err" v-if="err != null">{{ err }}</li>
            <li class="post-item" v-for="post in posts">
                <article>
                    <router-link class="title" :to="'/post/' + post.id">
                        {{ post.title }}
                    </router-link>
                    <div class="item-meta clearfix">
                        <div class="meta-left">
                            <router-link class="time" to="">
                                {{ post.meta.time }}
                            </router-link>
                            <span class="bull">·</span>
                            <router-link class="view-count" to="">
                                {{ post.meta.viewCount }} 人看过
                            </router-link>
                        </div>
                        <div class="meta-right">
                            <router-link class="like-count" to="">
                                 {{ post.meta.likeCount }} 赞
                            </router-link>
                            <span class="bull">·</span>
                            <router-link class="comment-count" to="">
                                {{ post.meta.commentCount }} 评
                            </router-link>
                        </div>
                    </div>
                    <div class="item-description">{{ post.description }}</div>
                </article>
            </li>
        </ul>
    </section>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                posts: null,
                err: null
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.err = this.post = null

                axios.get('posts')
                    .then(res => {
                        this.posts = res.data
                    })
                    .catch(err => {
                        this.err = err
                    })
            }
        }
    }
</script>

<style lang="css">
    .block-title {
        font-weight: 700;
        position: relative;
        display: none;
    }

    .block-title span {
        background: #fff;
        position: relative;
        z-index: 1;
        padding-right: 16px;
    }

    .block-title::after {
        content: '';
        position: absolute;
        height: 1px;
        left: 0;
        right: 0;
        top: 11px;
        background: #f0f0f0;
    }

    .post-item .title {
        color: #333;
        font-size: 1.2em;
        font-weight: bold;
    }

    .post-item .item-meta {
        font-size: 14px;
        color: #999;
        padding: 15px 0;
    }

    .post-item .meta-left {
        float: left;
    }

    .post-item .meta-right {
        float: right;
    }

    .bull {
        margin: 0 2px;
    }
</style>
<template>
    <section>
        <ul class="post-list">
            <li class="err" v-if="err != null">{{ err }}</li>
            <li class="post-item" v-for="post in posts">
                <article>
                    <router-link class="title" :to="'/post/' + post._id">
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
    import NProgress from 'nprogress'
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

                axios.start()
                    .get('post')
                    .then(res => {
                        this.posts = res.data
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

</style>
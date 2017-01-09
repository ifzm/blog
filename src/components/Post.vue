<template>
    <div>
        <div v-if="post != null" class="post-item">
            <article>
                <div class="title">
                    {{ post.title }}
                </div>
                <div class="item-meta clearfix">
                    <div class="meta-left">
                        <span class="time">{{ post.meta.time }}</span>
                        <span class="bull">·</span>
                        <span class="view-count">{{ post.meta.viewCount }} 人看过</span>
                    </div>
                    <div class="meta-right">
                        <span class="like-count">{{ post.meta.likeCount }} 赞</span>
                        <span class="bull">·</span>
                        <span class="comment-count">{{ post.meta.commentCount }} 评</span>
                    </div>
                </div>
                <div class="item-description">{{ post.description }}</div>
                <div class="item-content" v-html="post.content"></div>
            </article>
            <div class="sponsor">
                <div class>打赏支持</div>
                <img src="../assets/pay.png" alt="赞助">
            </div>
        </div>
        <div v-if="err != null">
            {{ err }}
        </div>
    </div>
</template>

<script>
    import NProgress from 'nprogress'
    import axios from 'axios'

    export default {
        data() {
            return {
                post: null,
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

                NProgress.start()
                axios.get('post/' + this.$route.params.id)
                    .then(res => {
                        this.post = res.data
                    })
                    .catch(err => {
                        this.err = err
                    })
                    .then(() => {
                        NProgress.done()
                    })
            }
        }
    }
</script>

<style lang="css">
    .sponsor {
        padding: 10px 0;
        text-align: center;
    }
    
    .sponsor img {
        margin: 5px 20px;
    }
</style>
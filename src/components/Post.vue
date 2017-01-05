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
                <div class="item-content">{{ post.content }}</div>
            </article>
            <div class="sponsor">
                <div class>打赏支持</div>
                <img src="../assets/alipay.jpg" alt="支付宝赞助">
                <img src="../assets/wxpay.png" alt="微信赞助">
            </div>
        </div>
        <div v-if="err != null">
            {{ err }}
        </div>
    </div>
</template>

<script>
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

                axios.get('post/' + this.$route.params.id)
                    .then(res => {
                        this.post = res.data
                    })
                    .catch(err => {
                        this.err = err
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
        width: 150px;
        height: 150px;
        margin: 10px 20px;
    }
</style>
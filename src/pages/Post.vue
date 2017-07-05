<template>
    <section>
        <article class="post-item" v-if="post">
            <div class="message" v-show="message">{{ message }}</div>
            <div class="post-item-title">{{ post.title }}</div>
            <div class="post-item-meta clearfix">
                <div class="post-item-meta-left">
                    <span class="time">{{ moment(post.date).fromNow() }}</span>
                    <span class="bull">·</span>
                    <span class="view-count">{{ post.meta.views }} 人看过</span>
                </div>
                <div class="post-item-meta-right">
                    <span class="like-count">{{ post.meta.likes }} 赞</span>
                    <span class="bull">·</span>
                    <span class="comment-count">{{ post.comments.length }} 评</span>
                </div>
            </div>
            <div class="post-item-description">{{ post.description }}</div>
            <div class="post-item-body markdown" v-html="post.body"></div>
            <div class="sponsor">
                <div class>打赏支持</div>
                <img src="../assets/pay.png" alt="赞助">
            </div>
        </article>
    </section>
</template>

<script>
export default {
    data() {
        return {
            post: null,
            message: null
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
            this.message = this.post = null

            this.axios.start()
                .get('post/' + this.$route.params.id)
                .then(res => {
                    this.post = res.data
                })
                .catch(err => {
                    this.message = err.message
                })
                .done()
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

.message {
    color: #f44336;
}

.post-item {
    padding: 30px 0;
}

.post-item-title {
    color: #333;
    font-size: 1.3em;
    font-weight: bold;
}

.post-item-meta {
    font-size: .8em;
    color: #999;
    padding: 15px 0;
}

.post-item-meta-left {
    float: left;
}

.post-item-meta-right {
    float: right;
}

.bull {
    margin: 0 2px;
}
</style>

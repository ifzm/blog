<template>
    <section>
        <ul class="post-list">
            <li class="message" v-show="message">{{ message }}</li>
            <li class="post-item" v-for="(post, index) in posts" :key="index">
                <article>
                    <router-link class="post-item-title" :to="'/post/' + post._id">
                        {{ post.title }}
                    </router-link>
                    <div class="post-item-meta clearfix">
                        <div class="post-item-meta-left">
                            <router-link class="time" to="">
                                {{ moment(post.date).fromNow() }}
                            </router-link>
                            <span class="bull">·</span>
                            <router-link class="view-count" to="">
                                {{ post.meta.views }} 人看过
                            </router-link>
                        </div>
                        <div class="post-item-meta-right">
                            <router-link class="like-count" to="">
                                {{ post.meta.likes }} 赞
                            </router-link>
                            <span class="bull">·</span>
                            <router-link class="comment-count" to="">
                                {{ post.comments.length }} 评
                            </router-link>
                        </div>
                    </div>
                    <div class="post-item-description">{{ post.description }}</div>
                </article>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            posts: null,
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
                .get('post')
                .then(res => {
                    this.posts = res.data.rows
                })
                .catch(err => {
                    this.message = err.message
                })
                .done()
        }
    }
}
</script>

<style scoped>
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

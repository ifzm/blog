<template>
    <section>
        <div class="post-create">
            <button type="button" class="md-button md-raised md-theme-default" @click="create">
                发表文章
            </button>
        </div>
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

                NProgress.start()
                axios.get('post')
                    .then(res => {
                        this.posts = res.data
                    })
                    .catch(err => {
                        this.err = err
                    })
                    .then(() => {
                        NProgress.done()
                    })
            },
            create() {
                NProgress.start()
                axios.post('post', {
                        title: '怎么解读「一个人越炫耀什么，内心就越缺少什么 」这句话？',
                        description: '怎么有人不看重点呢，并不是说你发自拍就是炫耀就是自卑，这姑娘是一天发好多条状态，大概6-9条左右，每一条都是说自己美，别人夸她美，她们全家都美所以自己无需整容。我刚加的时候还觉得这妹子真实可爱，性情中人，加了半个月她天天都是这样，难道这也很正常吗？',
                        content: '爱发自拍的朋友我也有，一天一张的也有，这种我第一次见。感觉可以写一本《自夸1000条不重复》。\n\n原回答:\n阿子姑娘在知乎上刚注册，第一个回答就是“长得好看但没有男朋友是什么样的体验”，后来加了她的微信，她微信上经常发自拍和段子，或者发家人的照片，字字句句都在表现自己很漂亮，截图也截的是别人夸她漂亮。\n我当时就觉得，一个从小到大都这么漂亮的女生，对于别人的夸赞其实早就应该看得很淡了，怎么会一直都保持着这种几乎是病态的炫耀。\n后来在豆瓣上看到她高中时期的照片，她那时候才16岁，长相很老成，还没学会打扮，五官虽然分明，但完全没有现在的美貌。现在找到了自己的风格，难免是要炫耀一番的，不过是希望从内而外地得到这么多年缺失的认可而已。\n\n炫耀什么的，无非是希望某个人知道，当初我没有xxx，现在我有了，我过得比你想象中的好，你当年有眼不识泰山。\n后来我在朋友圈看到晒车，晒表，晒照片的，都会点个赞，不过就只是缺乏认同感的人而已，我们谁不缺认同感呢？\n\n我啊...我朋友圈总是晒游戏截图，如果你们看到了，就给我点个赞吧。'
                    })
                    .then(res => {
                        console.log(res)
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

</style>
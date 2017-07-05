<template>
    <div class="content">
        <section class="articles">
            <div class="toolbar">
                <span class="toolbar-message">
                    目前共计<code>{{ total }}</code>篇博文，继续努力 (•̀ᴗ•́)و
                </span>
                <span class="toolbar-tools">
                    <input type="text" placeholder="关键词..." v-show="false">
                    <button class="button default bold">添加</button>
                </span>
            </div>
            <div class="items">
                <p class="message" v-show="message">{{ message }}</p>
                <article class="article" v-for="(article, index) in articles" :key="index">
                    <div class="article-title">
                        <span class="article-title-text">{{ article.title }}</span>
                        <span class="article-title-operate">
                            <button class="button fa fa-close" @click="del(article._id)"></button>
                        </span>
                    </div>
                    <div class="other-info" v-show="false">
                        <span class="other-info-time">
                            <i class="fa fa-calendar-check-o"></i>{{ article.meta.time }}
                        </span>
                        <span class="other-info-comment">
                            <i class="fa fa-comments"></i>{{ article.meta.commentCount }}
                        </span>
                        <span class="other-eye">
                            <i class="fa fa-eye"></i>{{ article.meta.viewCount }}
                        </span>
                    </div>
                </article>
            </div>
            <div class="pager">
                <button class="button default bold">NEXT</button>
            </div>
        </section>
        <section class="infos">

        </section>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
            page: 1,
            total: 0,
            message: null
        }
    },
    created() {
        this.axios
            .get('post')
            .then(res => {
                if (res.data.count === 0) {
                    this.message = '空空如也，还不快去写。 ∑(っ °Д °;)っ'
                } else {
                    this.articles = res.data.rows
                    this.total = res.data.count
                }
            })
            .catch(err => {
                this.message = err.message
            })
    },
    methods: {
        del(id) {
            this.axios
                .delete(`post/${id}`)
                .then(res => {
                    console.log(res)
                })
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-flow: row;
}

.articles {
    flex: 1;
}

.infos {
    margin-left: 10px;
    flex-basis: 300px;
}

.toolbar,
.items,
.pager {
    margin-bottom: 1em;
}

.toolbar {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
}

.toolbar-tools input {
    width: 140px;
    padding: 5px;
    border: 2px solid #ccc;
    border-radius: 3px;
    vertical-align: middle;
}

.article {
    margin-bottom: 10px;
    padding: 10px;
    background-color: hsla(0, 0%, 60%, .08);
    border-radius: 2px;
    color: #333;
}

.article .other-info {
    padding-top: 1em;
    font-size: 0.75em;
    color: #555;
}

.article .other-info span {
    margin-right: 1em;
    display: inline-flex;
    justify-content: center;
}

.article .other-info i.fa {
    line-height: 1.45;
    margin-right: 3px;
}

.article-title {
    display: flex;
    justify-content: space-between;
}

.article-title-text {
    flex: 1;
    width: 0;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
}

.article-title-operate {
    padding-left: 1em;
    flex-basis: 1em;
}

.article-title-operate button {
    padding-left: .5em;
    padding-right: .5em;
    min-width: 0;
    min-height: 1.45em;
    line-height: 1.45em;
    color: #ccc;
}

.article-title-operate button:hover {
    color: #333;
}

.pager {
    display: flex;
    flex: 1;
    align-content: center;
    justify-content: center;
}

.message {
    color: #999;
    padding: 5em;
    font-size: 0.95em;
    text-align: center;
}
</style>

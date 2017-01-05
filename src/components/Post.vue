<template>
    <div class="aaa">
        <div v-if="post != null">
            {{ post.id }}
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
    
</style>
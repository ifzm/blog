<template>
    <div>{{ text }}</div>
</template>

<script>
    import axios from 'axios'
    import nprogress from 'nprogress'

    export default {
        data() {
            return {
                text: 'heihei'
            }
        },
        created() {
            // nprogress.
            axios.get('http://localhost:4000/users')
                .then((res) => {
                    console.log(res)
                    this.text = JSON.stringify(res.data, null, 4)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
</script>
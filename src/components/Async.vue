<template>
    <div>{{ msg }}</div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                msg: 'heihei'
            }
        },
        created() {
            axios.get('http://localhost:4000/users')
                .then(res => {
                    this.msg = res.data
                })
                .catch(err => {
                    this.msg = err
                })
        }
    }
</script>
export default function(flag, callback) {
    setTimeout(() => {
        if (flag) {
            const hander = e => {
                if (!this.$el.contains(e.target)) {
                    callback && callback.call(this, e)
                    document.removeEventListener('click', hander)
                }
            }
            document.addEventListener('click', hander, false)
        }
    })
}
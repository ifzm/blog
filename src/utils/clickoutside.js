export default function(mark, $emit) {
    setTimeout(() => {
        if (this[mark]) {
            document.onclick = e => {
                if (!this.$el.contains(e.target)) {
                    this.$emit($emit)
                }
            }
        } else {
            document.onclick = null
        }
    })
}
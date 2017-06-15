/**
 * 工具函数集合
 */
export default {
    /**
     * 根据组件处理相关的Document点击事件
     * @param {any} flag 标识，用于区分当前组件是否处于可视状态
     * @param {any} callback 回调函数
     */
    clickoutside(flag, callback) {
        if (!flag && !callback) {
            let event = document.createEvent('MouseEvents')
            event.initMouseEvent('click', false, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
            document.dispatchEvent(event)
        } else {
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
    },
    /**
     * 在光标处插入字符串
     *
     * document.addEventListener('keydown', e => {
     *     let key = e.keyCode
     *     if (key === 9 && window.getSelection) {
     *         e.preventDefault()
     *         insertAtCursor.call(this, '  ')
     *     }
     * }, false)
     *
     * @param {string} str 需要插入的字符串
     */
    insertAtCursor(str) {
        let start = this.selectionStart,
            end = this.selectionEnd,
            offset = start + str.length

        this.value = this.value.substring(0, start) + str + this.value.substring(end)
        this.setSelectionRange(offset, offset)
    }
}

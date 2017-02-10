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
            event.initMouseEvent('click')
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
    }
}
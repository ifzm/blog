const marked = require('marked')
const hljs = require('highlight.js')

hljs.configure({
    tabReplace: '    ',
    classPrefix: ''
})

let renderer = new marked.Renderer()
renderer.code = (code, lang) => {
    return `<pre class="hljs"><code class="lang-${lang}">${hljs.highlightAuto(code).value}</code></pre>`
}

marked.setOptions({
    renderer: renderer
})

module.exports = marked
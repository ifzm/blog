const marked = require('marked')
const hljs = require('highlight.js')

hljs.configure({
  tabReplace: '    ',
  classPrefix: 'hljs-'
})

let renderer = new marked.Renderer()
renderer.code = (code, lang) => {
  return `<pre class="hljs lang-${lang}"><code>${hljs.highlightAuto(code).value}</code></pre>`
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true
})

module.exports = marked

const moment = require('moment')
const { marked, wrap } = require('../utils')
const Post = require('../models/post')

module.exports = app => {
  app.post('/post', async (req, res) => {
    let post = new Post(Object.assign(req.body, {
      meta: {
        time: new Date(),
        viewCount: 0,
        likeCount: 0,
        commentCount: 0
      }
    }))

    const row = await post.save()
    const message = row ? '添加成功！' : '添加失败！'
    const status = row ? 200 : 500
    res.json({ message, status })
  })

  app.get('/post', wrap(async (req, res) => {
    const count = await Post.find().count()
    let rows = await Post.find().skip(0).limit(10).sort({ 'meta.time': -1 })
    rows.forEach(post => { post.meta.time = moment(post.meta.time).fromNow() })
    res.json({ count, rows })
  }))

  app.get('/post/:id', wrap(async (req, res) => {
    let row = await Post.findOne({ _id: req.params.id })
    row.meta.time = moment(row.meta.time).fromNow()
    row.content = marked(row.content)
    res.json(row)
  }))

  app.delete('/post/:id', wrap(async (req, res, next) => {
    await Post.remove({ _id: req.params.id })
    res.status(200).json({ message: '删除成功！' })
  }))
}

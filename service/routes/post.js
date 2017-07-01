const Joi = require('joi')
const moment = require('moment')
const { marked, wrap, validate } = require('../utils')
const Post = require('../models/post')

module.exports = app => {
  const schema = {
    body: {
      title: Joi.string().required(),
      body: Joi.string().required()
    }
  }

  app
    .post('/post', validate(schema), wrap(async (req, res) => {
      const post = new Post(req.body)

      const row = await post.save()
      const message = row ? '添加成功！' : '添加失败！'
      const status = row ? 200 : 500
      res.json({ message, status })
    }))
    .get('/post', wrap(async (req, res) => {
      // await Promise.reject(new Error('aa'))
      const count = await Post.find().count()
      let rows = await Post.find().skip(0).limit(10).sort({ 'meta.time': -1 })
      rows.forEach(post => { post.meta.time = moment(post.meta.time).fromNow() })
      res.json({ count, rows })
    }))
    .get('/post/:id', wrap(async (req, res) => {
      let row = await Post.findOne({ _id: req.params.id })
      row.meta.time = moment(row.meta.time).fromNow()
      row.content = marked(row.content)
      res.json(row)
    }))
    .delete('/post/:id', wrap(async (req, res, next) => {
      await Post.remove({ _id: req.params.id })
      res.status(200).json({ message: '删除成功！' })
    }))
}

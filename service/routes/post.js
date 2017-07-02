const Joi = require('joi')
const { marked, wrap, validate } = require('../utils')
const Post = require('../models/post')

module.exports = app => {
  const schema = {
    body: {
      title: Joi.string().required().label('title is required'),
      body: Joi.string().required().label('body is required')
    }
  }

  app
    .post('/post', validate(schema), wrap(async (req, res) => {
      const post = new Post(req.body)
      await post.save()
      res.json({ message: '添加成功！' })
    }))
    .get('/post', wrap(async (req, res) => {
      const count = await Post.find().count()
      const rows = await Post.find().skip(0).limit(10).sort({ 'date': -1 })
      res.json({ count, rows })
    }))
    .get('/post/:id', wrap(async (req, res) => {
      let row = await Post.findOne({ _id: req.params.id })
      row.body = marked(row.body)
      res.json(row)
    }))
    .delete('/post/:id', wrap(async (req, res, next) => {
      await Post.remove({ _id: req.params.id })
      res.json({ message: '删除成功！' })
    }))
}

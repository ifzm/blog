const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  meta: Object,
  description: String,
  content: String
})

const post = mongoose.model('post', postSchema)

module.exports = post

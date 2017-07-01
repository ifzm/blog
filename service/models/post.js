const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: String,
  author: String,
  date: Date,
  body: String,
  description: String,
  hidden: Boolean,
  meta: {
    likes: Number,
    views: Number,
    tags: {
      type: [String],
      index: true
    }
  },
  comments: [{
    body: String,
    date: Date
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post

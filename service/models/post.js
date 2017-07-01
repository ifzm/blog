const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: String,
  body: String,
  description: String,
  author: {
    type: String,
    default: 'ifzm'
  },
  date: {
    type: Date,
    default: Date.now
  },
  hidden: {
    type: Boolean,
    default: false
  },
  meta: {
    likes: {
      type: Number,
      default: 0
    },
    views: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      index: true
    }
  },
  comments: [{
    body: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post

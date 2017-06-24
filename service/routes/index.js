const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/blog')

const db = mongoose.connection
db.on('error', console.error.bind(console, '连接失败！'))
db.once('open', console.log.bind(console, 'mongodb://localhost/blog 连接成功...'))

module.exports = app => {
  require('./post')(app)
}

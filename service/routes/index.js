const path = require('path')
const mongoose = require('mongoose')
const config = require('../config')
const { glob } = require('../utils')

mongoose.Promise = Promise
mongoose.connect(config.mongo.url)

const db = mongoose.connection
db.on('error', () => { console.error(`${config.mongo.url} open faild...`) })
db.once('open', () => { console.log(`${config.mongo.url} open success...`) })

module.exports = async app => {
  const files = await glob(__dirname, '[^index]\\.js')
  files.forEach(file => require(path.resolve(__dirname, file))(app))

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message })
  })
}

const path = require('path')
const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('../config')
const { glob } = require('../utils')

mongoose.Promise = Promise
mongoose.connect(config.mongo.url)

const db = mongoose.connection
db.on('error', () => { console.error(`${config.mongo.url} connection error...`) })
db.once('open', () => { console.log(`${config.mongo.url} connection error...`) })

module.exports = app => {
  glob(__dirname, '[^index]\\.js')
    .then(files => files.forEach(file => require(path.resolve(__dirname, file))(app)))
    .catch(console.error)
}

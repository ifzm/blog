const path = require('path')
const mongoose = require('mongoose')
const { mongo } = require('../config')
const { glob, upload } = require('../utils')

mongoose.Promise = global.Promise
mongoose.connect(mongo.url)

const db = mongoose.connection
db.on('error', () => { console.error(`${mongo.url} open faild...`) })
db.once('open', () => { console.log(`${mongo.url} open success...`) })

module.exports = async app => {
  const files = await glob(__dirname, '[^index]\\.js')
  files.forEach(file => require(path.resolve(__dirname, file))(app))

  app.post('/upload', upload.array('file'), (req, res, next) => {
    let files = []

    if (req.files) {
      files = [].concat(req.files).map(file => ({
        originalname: file.originalname,
        filename: 'http://localhost:4000/' + file.filename
      }))
    }

    res.json(files)
  })

  app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message })
  })
}

global.Promise = require('bluebird')

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const { upload } = require('./utils')
const routes = require('./routes')

const app = express()

require('moment').locale('zh-cn')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(express.static('uploads'))

app.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

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

routes(app)

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p)
  console.log('reason: ', reason)
})

app.listen(4000, () => {
  console.log('service listen 4000...')
})

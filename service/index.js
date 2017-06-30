global.Promise = require('bluebird')

const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

const app = express()

require('moment').locale('zh-cn')
app.use(methodOverride())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('uploads'))
app.all('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

routes(app)

app.listen(4000, () => {
  console.log('service listen 4000...')
})

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p)
  console.log('reason: ', reason)
})

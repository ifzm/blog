const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const routes = require('./routes')

const app = express()

require('moment').locale('zh-cn')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

routes(app)

app.listen(4000, () => {
    console.log('service listen 4000...')
})
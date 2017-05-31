const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const routes = require('./routes')

const app = express()

require('moment').locale('zh-cn')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('uploads'))

app.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.post('/upload', utils.upload.array('image'), (req, res, next) => {
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

app.listen(4000, () => {
    console.log('service listen 4000...')
})
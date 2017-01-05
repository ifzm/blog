const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')

const app = express()

moment.locale('zh-cn')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

app.get('/posts', (req, res) => {
    let posts = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

    posts.filter(post => {
        post.meta.time = moment(post.meta.time).fromNow()
    })

    res.json(posts)
})

app.get('/post/:id', (req, res) => {
    let posts = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

    posts.forEach(post => {
        if (post.id === req.params.id) {
            res.json(post)
        }
    })
})

app.listen(4000, () => {
    console.log('service listen 4000...')
})
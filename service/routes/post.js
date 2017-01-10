const moment = require('moment')
const utils = require('../utils')
const Post = require('../models/post')

module.exports = app => {

    app.post('/post', (req, res) => {
        let post = new Post(Object.assign(req.body, {
            meta: {
                time: new Date(),
                viewCount: 0,
                likeCount: 0,
                commentCount: 0
            }
        }))

        post.save()
            .then(row => {
                if (row) {
                    res.json({
                        'message': '添加成功！',
                        'status': '200'
                    })
                } else {
                    res.json({
                        'message': '添加失败！',
                        'status': '500'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.json({
                    'message': err,
                    'status': '500'
                })
            })
    })

    app.get('/post', (req, res) => {
        Post.find()
            .sort({
                'meta.time': -1
            })
            .limit(10)
            .then(rows => {
                rows.filter(post => {
                    post.meta.time = moment(post.meta.time).fromNow()
                })
                res.json(rows)
            })
            .catch(err => {
                console.error(err)
            })
    })

    app.get('/post/:id', (req, res) => {
        Post.findOne({ _id: req.params.id })
            .then(row => {
                row.meta.time = moment(row.meta.time).fromNow()
                row.content = utils.marked(row.content)
                res.json(row)
            })
            .catch(err => {
                console.error(err)
            })
    })

}
const express = require('express')

const app = express()

app.get('/users', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.send({
        id: '1',
        name: 'ifzm'
    })
})

app.listen(4000, () => {
    console.log('service listen 3000...')
})
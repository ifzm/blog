const multer = require('multer')
const md5 = require('md5')
const config = require('../config')

let storage = multer.diskStorage({
  destination: config.upload.path,
  filename: (req, file, cb) => {
    let fileFormat = (file.originalname).split('.')
    cb(null, md5(file) + '.' + fileFormat[fileFormat.length - 1])
  }
})

let upload = multer({
  storage: storage
})

module.exports = upload

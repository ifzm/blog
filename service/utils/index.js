const Promise = require('bluebird')
const readdir = Promise.promisify(require('fs').readdir)

// marked
exports.marked = require('./marked')

// multer upload middleware
exports.upload = require('./upload')

// Joi validate middleware
exports.validate = require('./validate')

// async-error-express-wrap
exports.wrap = fn => (...args) => fn(...args).catch(args[2])

// file glob find
exports.glob = (dir, regexp) => readdir(dir).then(files => files.filter(file => RegExp(regexp).test(file)))

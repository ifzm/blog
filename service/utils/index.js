const Promise = require('bluebird')
const readdir = Promise.promisify(require('fs').readdir)

exports.marked = require('./marked')
exports.upload = require('./upload')
exports.wrap = fn => (...args) => fn(...args).catch(args[2])
exports.glob = (dir, regexp) => readdir(dir).then(files => files.filter(file => RegExp(regexp).test(file)))

const Joi = require('joi')

/**
 * Validation Callback
 * @param {Object} req request
 * @param {Object} res response
 * @param {Function} next next function
 * @param {Object} options middleware options
 * @returns {Function}
 */
function callback (req, res, next, options) {
  return (err, value) => {
    if (err) {
      res.status(400).json(err.details)
      return
    }

    Object.assign(req, { validated: value })
    next()
  }
}

/**
 * Middleware function
 * @param {Object} schema Joi validate schema
 * @param {Object} options Joi validate options
 * @returns {Function}
 */
function middleware (schema, options = {}) {
  return (req, res, next) => {
    if (!schema) {
      next()
    }

    const validate = {};
    ['params', 'body', 'query', 'headers'].forEach((key) => {
      if (schema[key]) {
        validate[key] = req[key]
      }
    })

    return Joi.validate(validate, schema, options, callback(req, res, next, options))
  }
}

module.exports = middleware

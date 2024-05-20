const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method: ', req.method)
  logger.info('Path: ', req.path)
  logger.info('Body: ', req.body)
  logger.info('---')
  next()
}

const unknowEndpoint = (req, res) => {
  res.status(400).send({ error: 'Unkown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  if (error.name === 'CastError'){
    return res.status(400).send({ error: 'Malformed id' })
  } else  if (error.name === 'ValidationError'){
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknowEndpoint,
  errorHandler
}
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
  // logger.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(409).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization && authorization.startsWith('Bearer')){
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }
  next()
}

const userExtractor = (req, res, next) => {
  next()
}

module.exports = {
  requestLogger,
  unknowEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
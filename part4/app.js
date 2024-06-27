const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')

const blogsRouter = require('./controls/blogs')
const usersRouter = require('./controls/users')
const loginRouter = require('./controls/login')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

async function connectDb(){
  await mongoose.connect(config.MONGODB_URI)
  logger.info('Connected to MongoDB')
}
try{
  connectDb()
}catch(error){
  logger.error('Error connetig to MongoDb', error.message)
}

// mongoose.connect(config.MONGODB_URI)
//   .then(() => logger.info('Connected to MongoDB'))
//   .catch((error) => {
//   logger.error('Error connetig to MongoDb', error.message)
// })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknowEndpoint)
app.use(middleware.errorHandler)



module.exports = app
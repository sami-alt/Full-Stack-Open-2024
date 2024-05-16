const http = require('http')
const express = require('express')
const app = express()
const currentDate = new Date()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method, :url, :body'))
app.use(cors())
app.use(express.static('dist'))

const phoneNumber = require('./models')

const errorHandler = (error, request, response,  next) => {
  console.log(error.message)
  if (error.name === 'CastError'){
    return response.status(400).send({ error:'malformed id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(400)
    .send({ error:'unknonw endpoint' })
}

app.get('/api/numbers', (req, res, next) => {
  phoneNumber.find({}).then(result => {
    res.json(result)
  })
    .catch(error => next(error))
})

app.get('/api/numbers/:id', (req, res, next) => {
  const id = req.params.id
  phoneNumber.findById(id)
    .then((result) => res.json(result))
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  let numbers
  phoneNumber.find({}).then(numbers => (
    res.send(`Phonebook has info for ${numbers.length} people <br/> ${currentDate}`)))
    .catch(error => next(error))
})

app.post('/api/numbers', (req, res) => {
  const newNum = new phoneNumber({
    name: req.body.name,
    number: req.body.number
  })
  newNum.save()
    .then((newNum) => {
      res.json(newNum)
    }).catch(error => res.status(400).json(error))

})

app.put('/api/numbers/:id', (req, res, next) => {
  const id = req.params.id
  const updateNumber = req.body.number
  phoneNumber.findByIdAndUpdate(id, { number:updateNumber },{ new:true, runValidators:true, context:'query' })
    .then(() => console.log('number updated'))
    .catch(error => next(error))
  res.end()
})

app.delete('/api/numbers/:id', (req, res, next) => {
  const id = req.params.id
  phoneNumber.deleteOne({ _id: id })
    .then(() => console.log('del success'))
    .catch(error => next(error))
  res.status(204).end()
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen((PORT), () => {
  console.log(`Server listening to port ${PORT}`)
})
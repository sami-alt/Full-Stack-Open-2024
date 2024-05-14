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

app.get('/api/numbers', (req, res) => {
    phoneNumber.find({}).then(result => {
        res.json(result)
    })
})

app.get('/api/numbers/:id', (req, res) => {
    const id = req.params.id
    phoneNumber.findById(id).then((result)=> res.json(result))
    
        
    
})

app.get('info', (req, res) => {
    res.send(`Phonebook has info for ${numbers.length} people <br/> ${currentDate}`)
})

app.post('/api/numbers', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return res.status(404).json({
            error: 'name or number is empty'
        })
    }
    const newNum = new phoneNumber({
        name: req.body.name,
        number: req.body.number
    })
    newNum.save().then(() => {

    })
    
    const newNumber = {
        name: req.body.name,
        number: req.body.number
    }
    res.json(newNumber)
})


app.put('/api/numbers/:id', (req, res) => {
    const id = req.params.id
    console.log(req.body.number)
    console.log(id)
    phoneNumber.findByIdAndUpdate(id, {number: req.body.number}).then(()=>console.log('number updated'))
    res.end()
})

app.delete('/api/numbers/:id', (req, res) => {
    const id = req.params.id
    phoneNumber.deleteOne({ _id: id }).then(() => console.log('del success'))
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen((PORT), () => {
    console.log(`Server listening to port ${PORT}`)
})
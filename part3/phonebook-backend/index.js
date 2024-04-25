const http = require('http')
const express = require('express')
const app = express()
const currentDate = new Date()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method, :url, :body'))
app.use(cors())
app.use(express.static('dist'))

const password = "x4bYq92SPqgJzWvo" //import.meta.env.VITE_DB_KEY

const mongoUrl = `mongodb+srv://fullstackExer:${password}@phonebook.ejm04sj.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const phoneNumber = mongoose.model('Numbers', numberSchema)
     
app.get('/api/numbers', (req, res) => {
    phoneNumber.find({}).then(result=> {
        res.json(result)
    })
})

app.get('/api/numbers/:id', (req, res) => {
    const id = Number(req.params.id)
    const number = numbers.filter(number => number.id === id)
    if (number.length !== 0) {
        res.json(number)
    } else {
        res.status(404).end()
    }
})

app.get('info', (req, res) => {
    res.send(`Phonebook has info for ${numbers.length} people <br/> ${currentDate}`)
})

app.post('/api/numbers', (req,res) => {
    if(!req.body.name || !req.body.number){
        return res.status(404).json({
            error:'name or number is epmty'
        })
    }
    
    const names = numbers.map(number => number.name)
    const found = names.includes(req.body.name)
    
    if(found){
        return res.status(409).json({
            error:'name already in numbers'
        })
    }

    const newNumber = {
        name: req.body.name,
        number: req.body.number
    }
    res.json(newNumber)
})

app.delete('/api/numbers/:id', (req,res)=> {
    const id = Number(req.params.id)
    const newNumbers = numbers.filter(number => number.id !== id)
    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen((PORT), () => {
    console.log(`Server listening to port ${PORT}`)
})
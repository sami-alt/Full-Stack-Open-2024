const http = require('http')
const express = require('express')
const app = express()
const currentDate = new Date()
const morgan = require('morgan')
const cors = require('cors')
const e = require('cors')
morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method, :url, :body'))
app.use(cors())
app.use(express('dist'))

let numbers = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-642312"
    }
]

const generateId = () => Math.floor(Math.random() * 5000)
     
app.get('/api/numbers', (req, res) => {
    res.json(numbers)
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
        id:generateId(),
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
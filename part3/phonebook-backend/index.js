const http = require('http')
const express = require('express')
const app = express()


const numbers = [
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

app.get('/', (req, res) => {
    res.send('<h1>hello world</h1>')
})

app.get('/api/numbers', (req, res) => {
    res.json(numbers)
})

const PORT = 3001
app.listen((PORT), () => {
    console.log(`Server listening to port ${PORT}`)
})
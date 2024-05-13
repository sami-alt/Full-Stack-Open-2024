
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as an argument')
    process.exit()
}

const pw = process.env.VITE_DB_KEY


const password = process.argv[2] 
const nameToAdd =  process.argv[3]
const numberToAdd =  process.argv[4]

const url = `mongodb+srv://fullstackExer:${password}@phonebook.ejm04sj.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const phoneNumber = mongoose.model('Numbers', numberSchema)

const num = new phoneNumber({
    name: nameToAdd,
    number: numberToAdd
})
// console.log('num.name', num.name )
if (num.name !== undefined || num.number !== undefined) {
    num.save().then(result => {
        console.log(`added ${nameToAdd} number ${numberToAdd} to phonebook`)
        mongoose.connection.close()
    })
}
phoneNumber.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(num => {
        console.log(num.name, num.number)
    });
    mongoose.connection.close()
})
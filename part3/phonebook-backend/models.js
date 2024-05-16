const mongoose = require('mongoose')
const password = process.env.VITE_DB_KEY
const mongoUrl = `mongodb+srv://fullstackExer:${password}@phonebook.ejm04sj.mongodb.net/phone-book?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(mongoUrl)

const numberSchema = new mongoose.Schema({
  name:{ type:String,
    required:true,
    minLength:3
  },
  number:{
    type:String,
    validate:{
      validator: function(input){
        return /\d{2,3}-\d{6,}/.test(input)
      },
      message: props => `${props.value} is not valid phonenumber`
    },
    required: true,
    minLength:8
  }
})

numberSchema.set('toJSON',{
  transform:(document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('number', numberSchema)
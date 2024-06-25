// const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs',{ title:1, author:1, url:1, likes:1, })
  // console.log( users,'aaaa')
  res.json(users)
})

usersRouter.post('/', async (req,res) => {
  const { username, name, password } = req.body

  if (!username || !password){
    return res.status(400).json({ error:'username or password missing' })
  }

  if (username.length < 3 || password.length < 3){
    return res.status(400).json({ error:'username and password must be atleast 3 letters' })
  }

  // const found = await User.findOne({ username:username })
  // console.log(found, 'username found')
  // if (found){
  //   return res.status(409).json({error:"username already exists"})
  // }


  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(password, saltRounds)

  const newUser = new User ({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()
  // console.log(savedUser.body, 'user in database')
  if (savedUser){
    res.status(201).json(savedUser)
  }else {
    res.status(400).end()
  }

})



usersRouter.delete('/', async (req, res) => {
  // console.log('delete users')
  await User.deleteMany({})
  res.status(204).end()
})


module.exports = usersRouter
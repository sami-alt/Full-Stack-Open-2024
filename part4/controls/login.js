const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  // console.log('aaaa')
  const { username, password } = req.body
  // console.log(username, 'username from login')
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcryptjs.compare(password, user.passwordHash)


  if (!(user && passwordCorrect)){
    res.status(401).json({
      error: 'Invalida password or username'
    })
  }

  const tokenForUser = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(tokenForUser, process.env.SECRET/*, {expiresIn:60*60}*/)
  // console.log(token, 'token')
  res.status(200).send({ token, username:user.username, id:user._id })

})

module.exports = loginRouter

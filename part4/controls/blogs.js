const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer')){
    // console.log(authorization)
    const auth = authorization.replace('Bearer ', '')
    // console.log(auth)
    return auth
  }
  return null
}



blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1, id:1})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  // Blog.findById(id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(204).end()
  }
})


blogsRouter.post('/', async (req, res) => {
  console.log(process.env.SECRET)
  console.log(getTokenFrom(req))
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  
  if(!decodedToken.id){
    return res.status(401).json({error:'token invalid'})
  }


  const user = await User.findById(decodedToken.id)

  if (!req.body.title || !req.body.url) {
    res.status(400).end()
    return
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes ? req.body.likes : 0,
    user: user._id
  })
  const postedBlog = await blog.save()

  user.blogs = user.blogs.concat(postedBlog._id)

  await user.save()

  if (postedBlog) {
    res.status(201).json(postedBlog)

  } else {
    res.status(400).end()
  }

})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndDelete(id)
  res.status(204).end()

})

blogsRouter.delete('/', async (req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const updatedBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  console.log(updatedBlog, 'updatedBlog')

  await Blog.findByIdAndUpdate(id, { $set: updatedBlog }, { new: true, runValidators: true })

  res.status(200).end()

})

module.exports = blogsRouter
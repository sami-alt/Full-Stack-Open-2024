const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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
  // console.log(req, 'post blog')
  if (!req.body.title || !req.body.url){
    res.status(400).end()
    return
  }

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes ? req.body.likes : 0
  })
  const postedBlog = await blog.save()
  res.status(201).json(postedBlog)
  // console.log(postedBlog)

})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  await Blog.findByIdAndDelete(id)
  res.status(204).end()

})

blogsRouter.delete('/', async(req, res) => {
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
  
  await Blog.findByIdAndUpdate(id, {$set: updatedBlog },{ new:true, runValidators:true })
  
  res.status(200).end()
  
})

module.exports = blogsRouter
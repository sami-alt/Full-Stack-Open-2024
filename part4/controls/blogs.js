const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const blog = await Blog.findById(id)
  Blog.findById(id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
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

blogsRouter.put('/:id',async (req, res) => {
  const id = req.params.id
  // console.log(req.body.likes)
  const updatedBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, { updatedBlog },{ new:true, runValidators:true })

  res.json(updateBlog)
})

module.exports = blogsRouter
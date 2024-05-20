const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {res.json(blogs)})
})

blogsRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  Blog.findById(id)
    .then( blog => {
      if(blog){
        res.json(blog)
      } else {
        res.status(404).end()
      }
    }
    ).catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {

  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  blog.save()
    .then(blog => {
      res.json(blog)
    })
    .catch(error => next(error))

})

blogsRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))

})

blogsRouter.put('/:id', (req, res, next) => {
  const id = req.params.id

  const updatedBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }

  Blog.findByIdAndUpdate(id, { updatedBlog }, { new:true, runValidators: true })
    .then(updateBlog => {
      res.json(updateBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
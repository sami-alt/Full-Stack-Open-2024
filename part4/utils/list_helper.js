const _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes).reduce((sum, likes) => sum + likes, 0)
  return blogs.length ? likes : 0
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favorite, blog) => favorite.likes < blog.likes ? blog :  favorite)

  const info = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
  return info
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const biggestGroup = _.maxBy(Object.values(grouped), 'length')

  return {
    author: biggestGroup[0].author,
    blogs: biggestGroup.length,
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = Object.entries(_.groupBy(blogs, 'author'))
    .map(blog => {
      const author = blog[0]
      const totalLikes = _.sumBy(blog[1], 'likes')
      return { author, likes:totalLikes }
    })
  const mostLikedAuthor = _.maxBy(likesByAuthor, 'likes')

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}
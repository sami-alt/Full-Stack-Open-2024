const { test, after, before, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

before(async () => {
  await api.delete('/api/blogs')

  const testBlog = {
    title: 'Blog about stuff',
    author: 'Elon Musk',
    url: 'x.com',
    likes: 0
  }

  await api.post('/api/blogs')
    .send(testBlog)
    .expect(201)
})

test.only('Correct amount of blogs are returned in a json format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const res = await api.get('/api/blogs')
  assert.strictEqual(res.body.length, 1)

})

test('blog has property named id', async () => {
  const testPropertyId = await api.get('/api/blogs')
  const id = testPropertyId.body[0].hasOwnProperty('id')
  assert.strictEqual(id, true)
})

test('Verify posted blogs content and that it was deposited in db', async () => {
  const testNewBlogPost = {
    title: 'Test',
    author: 'Test writer',
    url: 'test.test',
    likes: 5
  }
  const lenBefore = (await api.get('/api/blogs')).body.length

  await api.post('/api/blogs')
    .send(testNewBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const lenAfter = await api.get('/api/blogs')
  const titles = lenAfter.body.map((blog) => blog.title)
  // const authors =lenAfter.body.map((blog) => blog.author)
  // const ulrs = lenAfter.body.map((blog) => blog.urls)
  // const likes = lenAfter.body.map((blog) => blog.likes)

  const contents = titles.includes(testNewBlogPost.title)
  assert.strictEqual(contents, true)
  assert.strictEqual(lenAfter.body.length, lenBefore + 1)

})

test('if likes property missing from request default to 0', async () => {
  const testNewBlogPost = {
    title: 'Test likes',
    author: 'Test writer',
    url: 'like.test',
    likes: undefined
  }

  await api.post('/api/blogs')
    .send(testNewBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const lastPost = await api.get('/api/blogs')

  assert.strictEqual(lastPost.body[lastPost.body.length - 1].likes, 0)
})

test('verify that if title or ulr properties are missing reponse is 400',async () => {
  const testNewBlogPost = {
    title: undefined,
    author: 'Test writer',
    url: undefined,
    likes: 5
  }

  await api.post('/api/blogs')
    .send(testNewBlogPost)
    .expect(400)
    
})


after(async () => {
 
  await mongoose.connection.close()
})
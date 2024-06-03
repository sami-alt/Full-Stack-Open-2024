const { test, after, before, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

// const helper = require('./utils/list_helper.js')


before(async () => {
  await api.delete('/api/blogs')
  await api.delete('/api/users')

  const newUser = {
    username: 'root',
    name: 'juuri',
    password: 'sekret'
  }

  const user = await api.post('/api/users').send(newUser)
  // const testBlog = {
  //   title: 'Blog about stuff',
  //   author: '',
  //   url: 'x.com',
  //   likes: 0,
  //   userId: user.body.id
  // }

  // await api.post('/api/blogs')
  //   .send(testBlog)
  //   .expect(201)

  console.log('test db initialized')

})

describe('Test adding users in db', () => {

  test.only('creation succeeds with fresh username', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      username: 'user',
      name: 'name',
      password: 'pass'
    }
    // console.log(newUser, 'newuser')
    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    // console.log(postedUser, 'usertoback')

    const usersAtEnd = await api.get('/api/users')

    assert.strictEqual(usersAtStart.body.length + 1, usersAtEnd.body.length)
    assert.strictEqual(newUser.username, usersAtEnd.body[usersAtEnd.body.length - 1].username)

  })

  test.only('Usernames have to be unique', async () => {
    const usersAtStart = await api.get('/api/users')
    const newUser = {
      username: 'user',
      name: 'sudo',
      password: 'word'
    }
    // console.log('before adding existing username')

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(409)
      .expect('Content-Type', /application\/json/)
    // console.log('bbbb')

    // console.log(result.body, 'after adding existing username')

    const usersAtEnd = await api.get('/api/users')

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtStart.body.length, usersAtEnd.body.length)
  })

  test.only('username  atleast 3 letters long', async () => {
    const user = {
      username: 'pa',
      name: 'name',
      password: 'password'
    }

    await api.post('/api/user')
      .send(user)
      .expect(400)

  })

  test.only('password  atleast 3 letters long',async () => {
    const user = {
      username: 'username',
      name: 'name',
      password: 'pa'
    }

    await api.post('/api/user')
      .send(user)
      .expect(400)

  })
})

test('login needed to post and blog is asigned to logge in user', () => {

})

test('only a blog owner can delete a blog and on failure returns status code 401', () => {

})



describe('test posting new blogs, contents and properties', () => {

  test('Correct amount of blogs are returned in a json format', async () => {
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
    const user = await api.get('/api/users')

    const testNewBlogPost = {
      title: 'Test',
      author: 'Test writer',
      url: 'test.test',
      likes: 5,
      userId: user.body[0].id
    }
    const lenBefore = (await api.get('/api/blogs')).body.length

    let postContent = await api.post('/api/blogs')
      .send(testNewBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const lenAfter = await api.get('/api/blogs')
    const id = postContent.body.id
    // console.log(id, 'id')
    const testNewPostContent = await api.get(`/api/blogs/${id}`)

    assert.deepStrictEqual(testNewPostContent.body, postContent.body)
    assert.strictEqual(lenAfter.body.length, lenBefore + 1)

  })

  test('if likes property missing from request default to 0', async () => {

    const user = await api.get('/api/users')
    // console.log(user.body, 'likes to 0')
    const testNewBlogPost = {
      title: 'Test likes',
      author: 'Test writer',
      url: 'like.test',
      likes: undefined,
      userId: user.body[0].id
    }

    await api.post('/api/blogs')
      .send(testNewBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const lastPost = await api.get('/api/blogs')

    assert.strictEqual(lastPost.body[lastPost.body.length - 1].likes, 0)
  })

  test('verify that if title or ulr properties are missing reponse is 400', async () => {
    const user = await api.get('/api/users')

    const testNewBlogPost = {
      title: undefined,
      author: 'Test writer',
      url: undefined,
      likes: 5,
      userId: user.body[0].id
    }

    await api.post('/api/blogs')
      .send(testNewBlogPost)
      .expect(400)

  })
})
describe('test blogs in database by id', () => {

  test('Delete a blog post by id', async () => {

    const user = await api.get('/api/users')

    const testNewBlogPost = {
      title: 'Test deleteting',
      author: 'Test writer',
      url: 'delete.test',
      likes: 7,
      userId: user.body[0].id
    }

    const newPost = await api.post('/api/blogs')
      .send(testNewBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const id = newPost.body.id

    await api.delete(`/api/blogs/${id}`)
      .expect(204)

    await api.get(`/api/blogs/${id}`).expect(204)


  })


  test('test updating information on individual post by id', async () => {

    const user = await api.get('/api/users')
    const NewBlogPost = {
      title: 'Test updating',
      author: 'Test writer',
      url: 'notupdated.test',
      likes: 5,
      userId: user.body[0].id
    }

    const updatedPost = {
      title: 'Test updated',
      author: 'Test writer',
      url: 'updated.test',
      likes: 10
    }

    const newPost = await api.post('/api/blogs')
      .send(NewBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const id = newPost.body.id

    await api.put(`/api/blogs/${id}`).send(updatedPost).expect(200)

    let updatedCheck = await api.get(`/api/blogs/${id}`)

    assert.notDeepStrictEqual(newPost.body, updatedCheck.body)
  })
})




after(async () => {
  await mongoose.connection.close()
})
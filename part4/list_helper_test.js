const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./utils/list_helper')
const { title } = require('node:process')


test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})


describe('total likes', () => {
    const blogs = [
        {
            "title": "Testing blog applications",
            "author": "Me Of Course",
            "url": "www.internet.web",
            "likes": 7,
            "id": "664b9904501d6a9644429a4c"
        },
        {
            "title": "Testing blog applications still",
            "author": "You Of Course",
            "url": "www.internet.fi",
            "likes": 10,
            "id": "664b991c501d6a9644429a4e"
        },
        {
            "title": "Testing blog applications still and still",
            "author": "Him Of Course",
            "url": "www.internet.com",
            "likes": 1,
            "id": "664b9935501d6a9644429a50"
        },
        {
            "title": "Got bored of testing blog aplication",
            "author": "They Of Course",
            "url": "www.internet.to",
            "likes": 3,
            "id": "664b9958501d6a9644429a52"
        },
        {
            "title": "Now i get paid to test blog aplication so i have to",
            "author": "Her Of Course",
            "url": "www.internet.net",
            "likes": 12,
            "id": "664b9991501d6a9644429a56"
        },
        {
            "title": "Got fired from testing blog aplication so now i dont have to",
            "author": "No one Of Course",
            "url": "www.internet.de",
            "likes": 3,
            "id": "664b99e6501d6a9644429a58"
        }
    ]

    const oneBlog = [
        {
        "title": "Testing blog applications still and still",
        "author": "Him Of Course",
        "url": "www.internet.com",
        "likes": 1,
        "id": "664b9935501d6a9644429a50"
        }
    ]

    const noBlogs = []

    test('when list six blogs', () => {
        const result = listHelper.totalLikes(blogs)
        //   console.log(result)
        assert.strictEqual(result, 36)
    })
    test('when list has just one blog likes equal that', () => {
        const result = listHelper.totalLikes(oneBlog)
        assert.strictEqual(result, 1)
    })

    test('Empty list return zero likes', ()=> {
        const result = listHelper.totalLikes(noBlogs)
        assert.strictEqual(result, 0)
    })

})

describe('Favorite blog, most blogs writen, most liked author',()=> {
    const blogs = [
        {
            "title": "Testing blog applications",
            "author": "Me Of Course",
            "url": "www.internet.web",
            "likes": 7,
            "id": "664b9904501d6a9644429a4c"
        },
        {
            "title": "Testing blog applications still",
            "author": "You Of Course",
            "url": "www.internet.fi",
            "likes": 10,
            "id": "664b991c501d6a9644429a4e"
        },
        {
            "title": "Testing blog applications still and still",
            "author": "You Of Course",
            "url": "www.internet.com",
            "likes": 1,
            "id": "664b9935501d6a9644429a50"
        },
        {
            "title": "Got bored of testing blog aplication",
            "author": "You Of Course",
            "url": "www.internet.to",
            "likes": 3,
            "id": "664b9958501d6a9644429a52"
        },
        {
            "title": "Now i get paid to test blog aplication so i have to",
            "author": "Her Of Course",
            "url": "www.internet.net",
            "likes": 12,
            "id": "664b9991501d6a9644429a56"
        },
        {
            "title": "Got fired from testing blog aplication so now i dont have to",
            "author": "No one Of Course",
            "url": "www.internet.de",
            "likes": 3,
            "id": "664b99e6501d6a9644429a58"
        }
    ]

    const oneBlog = [
        {
        "title": "Testing blog applications still and still",
        "author": "Him Of Course",
        "url": "www.internet.com",
        "likes": 1,
        "id": "664b9935501d6a9644429a50"
        }
    ]

    test('Favorite blog', ()=> {
        const result = listHelper.favoriteBlog(blogs)
        const correct = {
            title: 'Now i get paid to test blog aplication so i have to',
            author:'Her Of Course',
            likes: 12
        }
        assert.deepStrictEqual(result, correct)
    })

    test('most blogs', ()=> {
        const result = listHelper.mostBlogs(blogs)
        const correct = {
            author:'You Of Course',
            blogs:3
        }
        assert.deepStrictEqual(result, correct)
    })

    test('Likes by most liked', ()=> {
        const result = listHelper.mostLikes(blogs)
        const correct = 
            { author: 'You Of Course', likes: 14 }
        
        assert.deepStrictEqual(result, correct)
    })
})
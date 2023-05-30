//@ts-nocheck

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

// test('blogs are returned as json and length is correct', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//         .then(response => expect(response.body).toHaveLength(true))
//     //replace toHaveLength number with whatever number is visually in database
// })

test('unique identifier is id and not _id', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => response.body.forEach(blog => expect(blog.id).toBeDefined()))
})

test('create new blog post and length of blogs increased by one', async () => {
    const testBlogObject = {
        "title": "this is a dev server",
        "author": "Simon",
        "url": "www.test.com",
        "likes": 3
    }

    const initialLength = await api.get('/api/blogs').then(response => response.body.length)

    await api
        .post('/api/blogs')
        .send(testBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalLength = await api.get('/api/blogs').then(response => response.body.length)

    expect(finalLength).toEqual(initialLength + 1)

})

test('create new blog post with no likes property and verify likes default to 0', async () => {
    const testBlogObject = {
        "title": "this is a dev server",
        "author": "Simon",
        "url": "www.test.com1111"
    }

    await api
        .post('/api/blogs')
        .send(testBlogObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .then(response => expect(response.body.likes).toBe(0))
})

test('creating new blog post with no title or url properties gives 400 bad request', async () => {

    const testBlogObject = {
        "author": "Simon",
        "likes": 5
    }

    await api
        .post('/api/blogs')
        .send(testBlogObject)
        .expect(400)
}, 100000)

test('create blog post with id, delete that same blog post by ID and receive status 204', async () => {
    const testBlogObject = {
        "title": "delete test",
        "author": "Simon",
        "url": "www.testfso.com",
        "likes": 2043533
    }
    await api
        .post('/api/blogs')
        .send(testBlogObject)
        .expect(201)

    let testId

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => response.body.forEach(blog => { if (blog.title == "delete test") { testId = blog.id } }))
    await api
        .delete(`/api/blogs/${testId}`)
        .expect(204)
}, 100000)

test('create blog post with id, update likes of that post by ID, receive status 200', async () => {
    const testBlogObject = {
        "title": "put test",
        "author": "Simon",
        "url": "www.testfso.com",
        "likes": 3134
    }
    await api
        .post('/api/blogs')
        .send(testBlogObject)
        .expect(201)

    let testId

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => response.body.forEach(blog => { if (blog.title == "put test") { testId = blog.id } }))

    let prevLikes = testBlogObject.likes
    testBlogObject.likes++

    await api
        .put(`/api/blogs/${testId}`)
        .send(testBlogObject)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => expect(response.body.likes).toBe(prevLikes + 1))
})


afterAll(async () => {
    await mongoose.connection.close()
})


//@ts-nocheck

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json and length is correct', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => expect(response.body).toHaveLength(1))
})

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

afterAll(async () => {
    await mongoose.connection.close()
})


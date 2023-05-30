//@ts-nocheck
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogArray = await Blog.find({})
        response.json(blogArray)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    }
    catch (error) {
        next(error)
    }
})
module.exports = blogsRouter
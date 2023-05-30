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
    if (!request.body.likes) request.body.likes = 0

    if (!request.body.title || !request.body.url) {
        response.status(400).end()
        return
    }

    const blog = new Blog(request.body)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id.trim()

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: body.id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})


module.exports = blogsRouter
//@ts-nocheck
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    try {
        const blogArray = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogArray)
    }
    catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.likes) body.likes = 0

    if (!body.title || !body.url) {
        response.status(400).end()
        return
    }

    const user = await User.findOne()

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
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
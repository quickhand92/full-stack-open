//@ts-nocheck
const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')
const mongoUrl = config.MONGODB_URI


mongoose.connect(mongoUrl)
    .then(result => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.info('error connecting to MongoDB:', error.message)
    })

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    category: String,
    subCategory: String,
    author: String
})

const blogModel = mongoose.model('Blog',blogSchema)

module.exports = blogModel
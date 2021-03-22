const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    title: String,
    body: String, 
    date: String
});

const author = new mongoose.Schema({
    authorName: String,
    quote: String
});

const authorSchema = new mongoose.Schema({
    author: author,
    blogPosts: {
        type: [blogsSchema],
        default: undefined
    }
});

module.exports = mongoose.model('authorSchema', authorSchema);
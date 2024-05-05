const mongoose = require('./db');

const blogSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = Schema({
    name: String,
    email: String,
    message: String
})

module.exports = mongoose.model('commentSchema', commentSchema);
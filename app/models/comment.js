//app/models/comment.js

// load mongoose to define the model
var mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
    userName : String,
    comment : String,
    done : Boolean
});
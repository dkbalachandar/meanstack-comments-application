// app/routes.js
// load the Comment model
var Comment = require('./models/comment');

// expose the routes to our app with module.exports
module.exports = function(app) {

    // get all comments
    app.get('/api/comments/fetchAll', function(req, res) {

        // use mongoose to get all comments in the database
        Comment.find(function(err, comments) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(comments); // return all comments in JSON format
        });
    });

    // create comment and send back all comments after creation
    app.post('/api/comments/save', function(req, res) {

        // create a Comment, information comes from AJAX request from Angular
        Comment.create({
            comment: req.body.comment,
            userName: req.body.userName,
            done: false
        }, function(err, comment) {
            if (err)
                res.send(err);

            // get and return all the comments after you create another
            Comment.find(function(err, comments) {
                if (err)
                    res.send(err);
                res.json(comments);
            });
        });

    });

    // delete a Comment and send back all remaining Comments
    app.delete('/api/comments/delete/:comment_id', function(req, res) {
        Comment.remove({
            _id: req.params.comment_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the comments after the delete operation to make sure that the comment got deleted
            Comment.find(function(err, comments) {
                if (err)
                    res.send(err);
                res.json(comments);
            });
        });
    });
};
// server.js

// Modules ===============================================================
var express = require('express');
//Create the application with express
var app = express();
//mongoose is for  mongodb
var mongoose = require('mongoose');
// log requests to the console
var morgan = require('morgan');
// pull information from HTML POST
var bodyParser = require('body-parser');
// simulate DELETE and PUT
var methodOverride = require('method-override');

// Configuration ===============================================================
var database = require('./config/database');
//Connect to mongoDB
mongoose.connect(database.url);
// Set the port
var port = 8081;

// set the static files location /public/img will be /img for users

app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

// Routes ======================================================================
// configure our routes
require('./app/routes.js')(app);

// startup our app at http://localhost:8081
app.listen(port);
console.log("App listening on port : " + port);
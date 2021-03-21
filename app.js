// Module dependencies.
require('dotenv').config();
var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = express();

var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

// MongoClient
var MongoClient = require('mongodb').MongoClient;
// Database
var db;

// setup mongo connection
MongoClient.connect('mongodb://'+ process.env.MONGO_HOST +':'+ process.env.MONGO_PORT +'/'+ process.env.MONGO_DB, function(err, database) {	
	if (err) {
		throw err;
	}
	else {
		db = database;
		console.log("Connected to mongodb!");
	}
});

// make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

// routes
app.get('/', routes.homeDog);
app.get('/dog/:name', routes.findByName);
app.post('/create', routes.createDog);
app.post('/update', routes.updateDog);
app.post('/delete', routes.deleteDog);

app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

// Module dependencies.
var express = require('express')
  , index = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

// MongoClient
var MongoClient = require('mongodb').MongoClient;
// Database
var db;

// setup mongo connection
MongoClient.connect('mongodb://127.0.0.1:27017/myMongoDB', function(err, database) {
	if (err) {
		throw err;
	} else {
		db = database;
		console.log("Connected to db!");
	}
});

// make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', index.homeDog);
app.post('/create', index.createDog);
app.post('/delete', index.deleteDog);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

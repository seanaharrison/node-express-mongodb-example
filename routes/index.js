//Used for querying by _id
var ObjectId = require('mongodb').ObjectID;

// index
exports.homeDog = function(req, res) {
	var db = req.db;
	var collection = db.collection('dogs');
	collection.find().toArray(function(err, dogsArray) {
		if (dogsArray) {
			res.render('index', {
				title: 'Dogs',
				path: req.path,
				dogs: dogsArray
			});
		}
		else {
			res.render('index', {
				title: 'No Dogs Found'
			});
		}
	});
};

// create a new dog
exports.createDog = function(req, res) {
	var db = req.db;
	var collection = db.collection('dogs');
	var post = req.body;
	collection.insert(post, {
		safe: true
	}, function(error, result) {
		if (error) {
			res.render('error', {
				message: 'Dog Save Failed!'
			});
		}
		else {
			res.redirect("/");
		}
	});
};

// delete
exports.deleteDog = function(req, res) {
	var db = req.db;
	var collection = db.collection('dogs');
	var _id = req.body._id;
	var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
	if (_id.match(checkForHexRegExp)) {
		var objectId = new ObjectId(_id);
		collection.remove({
			'_id': objectId
		}, {
			safe: true
		}, function(error, result) {
			if (error) {
				res.render('error', {
					message: 'Dog Delete failed!'
				});
			}
			else {
				res.redirect("/");
			}
		});
	}
	else {
		res.render('error', {
			message: 'Invalid _id'
		});
	}
};
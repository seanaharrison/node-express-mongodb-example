//Used for querying by _id
var ObjectId = require('mongodb').ObjectID;

// index return all dogs
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

// get one dog
exports.findByName = function(req, res) {
	var db = req.db;
	var collection = db.collection('dogs');
	var name = req.params.name;
	collection.findOne({
		'name': name
	}, function(err, item) {
		if (item) {
			res.render('dog', {
				title: item.name,
				dog: item
			});
		}
		else {
			res.render('error', {
				message: 'Not Found'
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

// update a dog
exports.updateDog = function(req, res) {
	var db = req.db;
	var collection = db.collection('dogs');
	var id = req.body._id;
	var post = req.body;

	var dname = req.body.name;
	var dbreed = req.body.breed;
	var dcolour = req.body.colour;

	var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
	if (id.match(checkForHexRegExp)) {
		var objectId = new ObjectId(id);
		collection.update({
			'_id': objectId
		}, {
			$set: {
				name: dname,
				breed: dbreed,
				colour: dcolour
			}
		}, {
			safe: true
		}, function(err, item) {
			if (err) {
				res.render('error', {
					message: 'Dog Update Failed! ' + err
				});
			}
			else {
				res.redirect("/");
			}
		});
	}
	else {
		res.render('error', {
			message: 'Invalid Value'
		});
	}
};

// delete a dog
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
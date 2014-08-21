var User = require('../models/user.js');

exports.findAll = function(req, res) {
	User.find({}, function(err, docs) {
		res.json(docs);
	});
}

exports.findById = function(req, res) {
	User.findOne({ _id: req.params.userId }, function(err, doc) {
		res.json(doc);
	});
}

exports.createNewUser = function(req, res) {
    var newUser = {};

    console.log("OBJECT INOFRMATION FOR INSERTING NEW USER");
    for (var object in req.body){
		console.log(req.body[object]); // printing name of object for server debugging
		newUser[object] = req.body[object];
    }

    var newUserInstance = new User(newUser);

    newUserInstance.save(function(error, data){
		if(error){
		  res.json(error);
		}

		else{
		  res.json(data);
		}
    });
}

exports.editUser = function(req, res) {
	var id = req.params.userId;
	var userFromReq = req.body;

	User.findOneAndUpdate({ _id: id }, userFromReq, function(err, doc) {
		res.json(doc);
	});
}
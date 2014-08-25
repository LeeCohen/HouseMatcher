var User = require('../models/user.js');
var db = require('../db.js');
var utils = require('../utils.js');

exports.findAll = function(req, res) {
	var findAllCallback = function(err, docs) {
		res.json(docs);
	}

	db.findAll(User, findAllCallback);
}

exports.findById = function(req, res) {
	var findByIdCallback = function(err, doc) {
		res.json(doc);
	}

	db.findById(User, req.params.userId, findByIdCallback);
}

exports.createNew = function(req, res) {
    var newUserInstance = new User(utils.buildNewObjFromReq(req));

    var createNewCallback = function(error, data){
		if(error){
		  res.json(error);
		}

		else{
		  res.json(data);
		}
    }

    db.createNew(newUserInstance, createNewCallback);
}

exports.editUser = function(req, res) {
	var id = req.params.userId;
	var userFromReq = req.body;

	User.findOneAndUpdate({ _id: id }, userFromReq, function(err, doc) {
		res.json(doc);
	});
}

exports.deleteUser = function(req, res) {
	User.remove({ _id: req.params.userId }, function(err) {
		if(err) {
			res.json(err);
		}

		else {
			res.json('removed successfully');
		}
	});
}


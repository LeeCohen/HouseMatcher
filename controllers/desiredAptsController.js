var DesiredApt = require('../models/desiredApt.js');
var User = require('../models/user.js');
var db = require('../db.js');
var utils = require('../utils.js');

exports.findAll = function(req, res) {
	var findAllCallback = function(err, docs) {
		res.json(docs);
	}

	db.findAll(DesiredApt, findAllCallback);
}

exports.createNew = function(req, res) {
    var newDesiredAptInstance = new DesiredApt(utils.buildNewObjFromReq(req));

    if(!req.user) {
    	res.status(500).send('No user in session!');
    	return false;
    }
    
    utils.appendCreator(req, DesiredApt, newDesiredAptInstance.Creator);
    console.log(newDesiredAptInstance);

    var createNewCallback = function(error, newDesiredApt){
		if(error) {
			res.json(error);
		}

		else {
			utils.updateUserWithNewApt(req.user, User, "DesiredApts", newDesiredApt);
			res.json(newDesiredApt);
		}
    }

    db.createNew(newDesiredAptInstance, createNewCallback);
}

exports.deleteDesiredApt = function(req, res) {
	var deleteDesiredAptCallback = function(err) {
		if(err) {
			res.json(err);
		}

		else {
			removeDesiredAptFromCreator(req.params.desiredAptId, req.user, res);
		}
	}

	db.remove(DesiredApt, req.params.desiredAptId, deleteDesiredAptCallback);
}

function removeDesiredAptFromCreator(desiredAptId, user, res) {
	//users have refs for their desiredApts, so need to remove those refs
	var updateObj = {$pull: {'DesiredApts': desiredAptId}}
	var removeDesiredAptFromCreatorCallback = function(err, numAffected) {
		res.json('removed successfully');
	}

	db.update(User, user._id, updateObj, removeDesiredAptFromCreatorCallback);
}
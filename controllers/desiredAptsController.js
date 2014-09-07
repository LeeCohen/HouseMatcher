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
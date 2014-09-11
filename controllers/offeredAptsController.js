var OfferedApt = require('../models/offeredApt.js');
var User = require('../models/user.js');
var db = require('../db.js');
var utils = require('../utils.js');

exports.findAll = function(req, res) {
	var findAllCallback = function(err, docs) {
		res.json(docs);
	}

	db.findAll(OfferedApt, findAllCallback);
}

exports.createNew = function(req, res) {
    var newOfferedAptInstance = new OfferedApt(utils.buildNewObjFromReq(req));

    utils.appendCreator(req, OfferedApt, newOfferedAptInstance.Creator);
    if(req.files.Pictures) {
    	// if pictures were sent
    	appendPicturesToNewInstance(req, newOfferedAptInstance);
    }

    var createNewCallback = function(error, newOfferedApt){
		if(error) {
			res.json(error);
		}

		else {
			utils.updateUserWithNewApt(req.user, User, "OfferedApts", newOfferedApt);
			searchForMatchingDesiredApt(utils.buildNewObjFromReq(req));
			res.json(newOfferedApt);
		}
    }

    db.createNew(newOfferedAptInstance, createNewCallback);
}

exports.getRecentOfferedApts = function(req, res) {
	var getRecentCallback = function(error, docs) {
		if(error){
		  res.json(error);
		}

		else{
		  res.json(docs);
		}
	}

	db.getRecentApts(OfferedApt, getRecentCallback);
}

function appendPicturesToNewInstance(req, newInstance) {
	var picturesArr = [];

	//checking if req.files.Pictures is an array, it will be so if more than 1 pic was sent
	if(!Array.isArray(req.files.Pictures)) {
		pushToPicturesArr(picturesArr, req.files.Pictures.path);
	}

	else {
		for (var i = 0; i < req.files.Pictures.length; i++) {
			pushToPicturesArr(picturesArr, req.files.Pictures[i].path);
		}
	}

	newInstance.Pictures = picturesArr;
}

function pushToPicturesArr(picturesArr, pathString) {
	picturesArr.push(pathString.replace(/uploads\\/g, '/'));
}

exports.searchOfferedApts = function(req, res) {
	var desiredAptFromUserSearch = utils.buildNewObjFromReq(req); // query from the user
	var searchOfferedAptsCallback = function(err, docs){
		res.json(docs);
	}

	db.searchOfferedApts(desiredAptFromUserSearch, searchOfferedAptsCallback);
}

function searchForMatchingDesiredApt(newOfferedApt) {
	var searchForMatchingDesiredAptCallback = function(err, desiredApts) {
		utils.notifyDesiredAptsCreators(newOfferedApt, desiredApts);
	}

	db.searchDesiredApts(newOfferedApt, searchForMatchingDesiredAptCallback);
}

exports.deleteOfferedApt = function(req, res) {
	var deleteOfferedAptCallback = function(err) {
		if(err) {
			res.json(err);
		}

		else {
			removeOfferedAptFromCreator(req.params.offeredAptId, req.user, res);
		}
	}

	db.remove(OfferedApt, req.params.offeredAptId, deleteOfferedAptCallback);
}

function removeOfferedAptFromCreator(offeredAptId, user, res) {
	//users have refs for their offeredApts, so need to remove those refs
	var updateObj = {$pull: {'OfferedApts': offeredAptId}}
	var removeOfferedAptFromCreatorCallback = function(err, numAffected) {
		res.json('removed successfully');
	}

	db.update(User, user._id, updateObj, removeOfferedAptFromCreatorCallback);
}
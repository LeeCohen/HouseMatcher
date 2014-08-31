var OfferedApt = require('../models/offeredApt.js');
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

    if(req.files.Pictures) {
    	// if pictures were sent
    	appendPicturesToNewInstance(req, newOfferedAptInstance);
    }

    var createNewCallback = function(error, data){
		if(error) {
		  res.json(error);
		}

		else {
		  res.json(data);
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
	var desiredApt = utils.buildNewObjFromReq(req); // query from the user
	var query = OfferedApt.find();

	for(key in desiredApt) {
		if(key === 'Properties.Min_Rooms') {
			query.where('Properties.Rooms').gte(desiredApt['Properties.Min_Rooms']);
		}

		else if(key === 'Properties.Max_Rooms') {
			query.where('Properties.Rooms').lte(desiredApt['Properties.Max_Rooms']);
		}

		else if(key === 'Properties.Max_Rooms') {
			Max_Floor
		}

		else {
			query.where(key).equals(desiredApt[key]);
		}
	}

	query.exec(function(err, docs){
		res.json(docs);
	});
}
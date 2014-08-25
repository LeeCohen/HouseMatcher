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

    var createNewCallback = function(error, data){
		if(error){
		  res.json(error);
		}

		else{
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
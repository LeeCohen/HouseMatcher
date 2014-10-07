exports.findAll = function(model, callback) {
	model.find({}, callback);
}

exports.findById = function(model, idParam, callback) {
	model.findOne({ _id: idParam}, callback);
}

exports.createNew = function(instance, callback) {
	instance.save(callback);
}

exports.remove = function(model, idParam, callback) {
	model.remove({_id: idParam}, callback);
}

exports.update = function(model, idParam, updateObj, callback) {
	var query = {_id: idParam}

	model.update(query, updateObj, callback);
}

exports.getRecentApts = function(model, callback) {
	var numOfDocsToReturn = 3;

	model
	.find({})
	.limit(numOfDocsToReturn)
	.sort({_id: -1})
	.exec(callback);
}

exports.searchOfferedApts = function(desiredApt, callback) {
	var offeredAptModel = require('./models/offeredApt.js');
	var query = offeredAptModel.find({});

	buildQueryForSearchOfferedApts(query, desiredApt);
	query.exec(callback);
}

function buildQueryForSearchOfferedApts(query, desiredApt) {
	for(key in desiredApt) {
		console.log(key);
		if(key === 'Properties.Min_Rooms') {
			query.where('Properties.Rooms').gte(desiredApt[key]);
		}

		else if(key === 'Properties.Max_Rooms') {
			query.where('Properties.Rooms').lte(desiredApt[key]);
		}

		else if(key === 'Properties.Min_Floor') {
			query.where('Properties.Floor').gte(desiredApt[key]);
		}

		else if(key === 'Properties.Max_Floor') {
			query.where('Properties.Floor').lte(desiredApt[key]);
		}

		else if(key === 'Location.From_HouseNumber') {
			query.where('Location.HouseNumber').gte(desiredApt[key]);
		}

		else if(key === 'Location.To_HouseNumber') {
			query.where('Location.HouseNumber').lte(desiredApt[key]);
		}

		else if(key === 'Properties.Max_Price') {
			query.where('Properties.Price').lte(desiredApt[key]);
		}

		else {
			query.where(key).equals(desiredApt[key]);
		}
	}
}

// this is the key feature of the application. when a new offered apt is created,
// the app will search for a desired apt that matches for that new offered apt and the
// desired apt creator will get an email notifying about this event

exports.searchDesiredApts = function(offeredApt, callback) {
	var desiredAptModel = require('./models/desiredApt.js');
	var query = desiredAptModel.find({});

	buildQueryForSearchDesiredApts(query, offeredApt);
	query.exec(callback);
}

function buildQueryForSearchDesiredApts(query, offeredApt) {
	console.log(offeredApt);
	for(key in offeredApt) {
		console.log(key);
		if(key === 'Properties.Rooms') {
			query.where('Properties.Min_Rooms').lte(offeredApt[key]);
			query.where('Properties.Max_Rooms').gte(offeredApt[key]);
		}

		else if(key === 'Properties.Floor') {
			query.where('Properties.Min_Floor').lte(offeredApt[key]);
			query.where('Properties.Max_Floor').gte(offeredApt[key]);
		}

		else if(key === 'Location.HouseNumber') {
			query.where('Location.From_HouseNumber').lte(offeredApt[key]);
			query.where('Location.To_HouseNumber').gte(offeredApt[key]);
		}

		else if(key === 'Properties.Price') {
			query.where('Properties.Max_Price').gte(offeredApt[key]);
		}

		else {
			query.where(key).equals(offeredApt[key]);
		}
	}
}
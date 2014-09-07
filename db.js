exports.findAll = function(model, callback) {
	model.find({}, callback);
}

exports.findById = function(model, idParam, callback) {
	model.findOne({ _id: idParam}, callback);
}

exports.createNew = function(instance, callback) {
	instance.save(callback);
}

exports.getRecentApts = function(model, callback) {
	var numOfDocsToReturn = 10;

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
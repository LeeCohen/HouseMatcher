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
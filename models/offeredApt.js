var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferedAptSchema = new Schema({
  	creator : { type: Schema.ObjectId, ref: 'Users'},
	city: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String},
	HouseNumber: {type: Number},
	Price: {type: Number},
	Size: {type: Number},
	Rooms: {type: Number},
	Level: {type: Number},
	Parking: {type: Number},
	Elevator: {type: Number},
	Pets: {type: Number},
	Published_Date: {type: Date},
	Picture : [String]
});

module.exports = mongoose.model('OfferedApt', OfferedAptSchema, 'project.OfferedApt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferedAptSchema = new Schema({
  	creator : { type: Schema.ObjectId, ref: 'Users'},
	city: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String, required: true},
	HouseNumber: {type: Number},
	Price: {type: Number, required: true},
	Size: {type: Number},
	Rooms: {type: Number, required: true},
	Level: {type: Number},
	Parking: {type: Number},
	Elevator: {type: Number},
	Pets: {type: Number},
	Published_Date: {type: Date},
	Picture : [String]
});

module.exports = mongoose.model('OfferedApt', OfferedAptSchema, 'project.OfferedApts');
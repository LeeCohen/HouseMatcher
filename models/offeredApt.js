var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferedAptSchema = new Schema({
  	Creator : { type: Schema.ObjectId, ref: 'Users'},
	City: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String, required: false},
	HouseNumber: {type: Number},
	Price: {type: Number, required: false},
	Size: {type: Number},
	Rooms: {type: Number, required: false},
	Floor: {type: Number},
	Parking: {type: String},
	Elevator: {type: String},
	SafeRoom: {type: String},
	Balcony: {type: String},
	WindowsBars: {type: String},
	Furniture: {type: String},
	AirConditioning: {type: String},
	SunBoiler: {type: String},
	Pets: {type: String},
	Published_Date: {type: Date},
	Picture : [String]
});

module.exports = mongoose.model('OfferedApt', OfferedAptSchema, 'project.OfferedApts');
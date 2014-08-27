var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesiredAptSchema = new mongoose.Schema({
	creator : { type: Schema.ObjectId, ref: 'Users' },
	city: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String},
	From_HouseNumber: {type: Number},
	To_HouseNumber: {type: Number},
	Max_Price: {type: Number},
	Size: {type: Number},
	Max_Rooms: {type: Number},
	Min_Rooms: {type: Number},
	Max_Floor: {type: Number},
	Min_Floor: {type: Number},
	Parking: {type: Number},
	Elevator: {type: Number},
	SafeRoom: {type: String},
	Balcony: {type: String},
	WindowsBars: {type: String},
	Pets: {type: Number},
	Furniture: {type: String},
	AirConditioning: {type: String},
	SunBoiler: {type: String},
	Published_Date: {type: Date}
});

module.exports = mongoose.model('DesiredApt', DesiredAptSchema, 'project.DesiredApts');
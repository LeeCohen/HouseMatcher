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
	Max_Level: {type: Number},
	Min_Level: {type: Number},
	Parking: {type: Number},
	Elevator: {type: Number},
	Pets: {type: Number},
	Published_Date: {type: Date},
});

module.exports = mongoose.model('DesiredApt', DesiredAptSchema, 'project.DesiredApts');
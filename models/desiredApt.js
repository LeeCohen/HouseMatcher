var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesiredAptSchema = new mongoose.Schema({
	creator : { type: Schema.ObjectId, ref: 'Users' 
	city: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String},
	From_HouseNumber: {type: int},
	To_HouseNumber: {type: int},
	Max_Price: {type: int},
	Size: {type: int},
	Max_Rooms: {type: int},
	Min_Rooms: {type: int},
	Max_Level: {type: int},
	Min_Level: {type: int},
	Parking: {type: int},
	Elevator: {type: int},
	Pets: {type: int},
	Published_Date: {type: Date},
});

module.exports = mongoose.model('DesiredApt', DesiredAptSchema, 'project.DesiredApts');
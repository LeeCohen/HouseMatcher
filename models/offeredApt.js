var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferdAptSchema = new Schema({
  	creator : { type: Schema.ObjectId, ref: 'Users' 
	city: {type: String, required: true},
	Neighborhood: {type: String},
	Street: {type: String},
	HouseNumber: {type: int},
	Price: {type: int},
	Size: {type: int},
	Rooms: {type: int},
	Level: {type: int},
	Parking: {type: int},
	Elevator: {type: int},
	Pets: {type: int},
	Published_Date: {type: Date},
	Picture : [String],
	Valid,
});

module.exports = mongoose.model('OfferedApt', OfferedAptSchema, 'project.OfferedApt');
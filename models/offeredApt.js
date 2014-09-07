var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferedAptSchema = new Schema({
	Creator: {
		First_name: {type: String, required: false},
		Last_name: {type: String, required: false},
		Email: {type: String, required: false},
		Phone_Number: {type: String, required: false}
	},

	Location: {
		City: {type: String, required: true},
		Neighborhood: {type: String},
		Street: {type: String, required: false},
		HouseNumber: {type: Number},
	},

	Properties: {
		Price: {type: Number, required: false},
		Size: {type: Number},
		Rooms: {type: Number, required: false},
		Floor: {type: Number},
	},
	
	Utilities: {
		Parking: {type: Boolean},
		Elevator: {type: Boolean},
		SafeRoom: {type: Boolean},
		Balcony: {type: Boolean},
		WindowsBars: {type: Boolean},
		Furniture: {type: Boolean},
		AirConditioning: {type: Boolean},
		SunBoiler: {type: Boolean}
	},
	
	Pictures : [String],
	Published_Date: {type: Date, default: Date.now }
	
});

module.exports = mongoose.model('OfferedApt', OfferedAptSchema, 'project.OfferedApts');
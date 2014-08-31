var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DesiredAptSchema = new mongoose.Schema({
	Creator: {
		First_name: {type: String, required: false},
		Last_name: {type: String, required: false},
		Email: {type: String, required: false},
		Phone_Number: {type: String, required: false}
	},

	Location: {
		City: {type: String, required: true},
		Neighborhood: {type: String},
		Street: {type: String}
	},

	Properties: {
		From_HouseNumber: {type: Number},
		To_HouseNumber: {type: Number},
		Max_Price: {type: Number},
		Size: {type: Number},
		Max_Rooms: {type: Number},
		Min_Rooms: {type: Number},
		Max_Floor: {type: Number},
		Min_Floor: {type: Number}
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

	Published_Date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('DesiredApt', DesiredAptSchema, 'project.DesiredApts');
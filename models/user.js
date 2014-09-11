var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	Username: {type: String, required: true},
	Hashed_password: {type: String, required: true},
	Email: {type: String, required: true},
	Phone_Number: {type: String, required: false},
	First_name: {type: String, required: true},
	Last_name: {type: String, required: true},
	OfferedApts: [Schema.ObjectId],
	DesiredApts: [Schema.ObjectId],
	LikedApts:[Schema.ObjectId]
});

module.exports = mongoose.model('Users', UsersSchema, 'project.Users');
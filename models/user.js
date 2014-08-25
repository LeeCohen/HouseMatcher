var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  username: {type: String, required: true},
  Hashed_password: {type: String},
  Email: {type: String, required: false},
  Phone_Number: {type: String, required: false},
  First_name: {type: String, required: false},
  Last_name: {type: String, required: false},
  OfferdApts: [Schema.ObjectId],
  DesiredApts: [Schema.ObjectId],
  LikedApts:[Schema.ObjectId]
});

module.exports = mongoose.model('Users', UsersSchema, 'project.Users');
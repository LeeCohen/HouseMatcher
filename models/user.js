var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  username: {type: String, required: true},
  Hashed_password: {type: String, required: true},
  Email: {type: String, required: true},
  Phone_Number: {type: String, required: true},
  First_name: {type: String, required: true},
  First_name: {type: String, required: true}
});

module.exports = mongoose.model('Users', UsersSchema, 'project.Users');
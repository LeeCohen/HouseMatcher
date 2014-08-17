var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  username: String
});

module.exports = mongoose.model('user', usersSchema);
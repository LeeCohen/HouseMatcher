var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var aptSchema = new Schema({
  city: String
});

module.exports = mongoose.model('desiredApt', aptSchema, 'project.apts');
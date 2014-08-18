var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function emailValidator(elementValue){        
    var emailPattern = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;  
    return emailPattern.test(elementValue);   
  } 

var UsersSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, validate: emailValidator},
  Phone_Number: {type: String, required: true},
  First_name: {type: String, required: true},
});

module.exports = mongoose.model('Users', UsersSchema, 'project.Users');
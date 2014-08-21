var request = require('request');

request.put({
  url:     'http://localhost:3000/users/53f5baa97c562b387887b3c9',
  form:    {	food: "pizza"}
		   
}, function(error, response, body){
  console.log(body);
});
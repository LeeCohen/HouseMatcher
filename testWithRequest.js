var request = require('request');

request.post({
  url:     'http://localhost:3000/createNewOfferedApt',
  form:    {	City: 'Tel-Aviv',
  				Street: 'Sderot Rotchild',
  				Price: 6000,
  				Rooms: 3}
		   
}, function(error, response, body){
  console.log(body);
});
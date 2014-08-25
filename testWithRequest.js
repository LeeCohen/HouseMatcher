var request = require('request');

request.post({
  url:     'http://localhost:3000/offeredApts/',
  form:    {	City: "Ramat-Gan",
				Street: "Negba",
				Price: 3500,
				Rooms: 2}
		   
}, function(error, response, body){
  console.log(body);
});
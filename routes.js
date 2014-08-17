var User = require('./models/user.js');
var Apt = require('./models/apt.js');

module.exports = function (app) {
    // set up routes
    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    app.get('/users', function(req, res) {
 		// User.find({}, function(err, docs) {
   //  		res.json(docs);
   //  	});

		 User
		.find({})
		.limit(10)
		.exec(function(err, docs) {
     		res.json(docs);
     	});
    });

    app.get('/apts', function(req, res) {
 		Apt.find({}, function(err, docs) {
    		res.json(docs);
    	});
    });
};
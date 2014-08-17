var User = require('./models/user.js');

module.exports = function (app) {
    // set up the routes
    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    app.get('/users', function(req, res) {
 		User.find({}, function(err, docs) {
    		res.json(docs);
    	});
    });
};
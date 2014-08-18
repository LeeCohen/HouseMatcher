var User = require('./models/user.js');
var DesiredApt = require('./models/desiredApt.js');
var OfferedApt = require('./models/offeredApt.js');

module.exports = function (app) {
    // set up routes
    // app.get("/", ensureAuthenticated, function (req, res) {
    //     res.send("Hello World");
    // });

    // app.get('/login', routes.login);
    // app.post('/login',
    //     passport.authenticate('local', { successRedirect: '/',
    //                                failureRedirect: '/login',
    //                                failureFlash: true })
    // );

     app.get("/", function (req, res) {
         res.send("Hello World");
     });


    app.get('/users', function(req, res) {
 		User.find({}, function(err, docs) {
    		res.json(docs);
    	});
    });

    app.get('/desiredApts', function(req, res) {
 		Apt.find({}, function(err, docs) {
    		res.json(docs);
    	});
    });

    app.get('/offeredApts', function(req, res) {
        Apt.find({}, function(err, docs) {
            res.json(docs);
        });
    });
};


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
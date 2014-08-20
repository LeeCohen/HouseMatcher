var User = require('./models/user.js');
var DesiredApt = require('./models/desiredApt.js');
var OfferedApt = require('./models/offeredApt.js');

module.exports = function (app, passport) {
    require('./login.js')(passport);

    // set up routes
    app.get("/", ensureAuthenticated, function (req, res) {
        res.send("Hello World");
    });

    app.get('/login', function(req, res) {

        res.sendfile('./public/login.htm');
    });

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'})
    );

     // app.get("/", function (req, res) {
     //     res.send("Hello World");
     // });


    app.get('/users',ensureAuthenticated, function(req, res) {
 		User.find({}, function(err, docs) {
    		res.json(docs);
    	});
    });

   //  app.get('/desiredApts', function(req, res) {
 		// Apt.find({}, function(err, docs) {
   //  		res.json(docs);
   //  	});
   //  });

   //  app.get('/offeredApts', function(req, res) {
   //      Apt.find({}, function(err, docs) {
   //          res.json(docs);
   //      });
   //  });

    app.post('/createNewOfferedApt', function(req, res) {
      var newOfferedApt = {};

      console.log(req.body.City);

      newOfferedApt.City = req.body.City;
      newOfferedApt.Rooms = req.body.Rooms;
      newOfferedApt.Street = req.body.Street;
      newOfferedApt.Price = req.body.Price;


      var newOfferedAptInstance = new OfferedApt(newOfferedApt);

      newOfferedAptInstance.save(function(error, data){
        if(error){
            res.json(error);
        }
        else{
            res.json(data);
        }
      });
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("inside ensureAuthenticated, redirecting to login");
    res.redirect('/login');
}
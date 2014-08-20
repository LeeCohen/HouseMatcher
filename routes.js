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

  app.post('/createNewUser', function(req, res) {
    var newUser = {};

    console.log("OBJECT INOFRMATION FOR INSERTING NEW USER");
    for (var object in req.body){
      console.log(req.body[object]); // printing name of object for server debugging
      newUser[object] = req.body[object];
    }

    var newUserInstance = new User(newUser);

    newUserInstance.save(function(error, data){
      if(error){
          res.json(error);
      }
      else{
          res.json(data);
      }
    });
  });
   //  app.get('/desiredApts', function(req, res) {
    // Apt.find({}, function(err, docs) {
   //     res.json(docs);
   //   });
   //  });
  app.post('/createNewDesiredApt', function(req, res) {
    var newDesiredApt = {};

    console.log("OBJECT INOFRMATION FOR INSERTING NEW DISRED APT");
    for (var object in req.body){
      console.log(req.body[object]); // printing name of object for server debugging
      newDesiredApt[object] = req.body[object];
    }

    var newDesiredAptInstance = new DesiredApt(newDesiredApt);

    newDesiredAptInstance.save(function(error, data){
      if(error){
          res.json(error);
      }
      else{
          res.json(data);
      }
    });
  });
   //  app.get('/offeredApts', function(req, res) {
   //      Apt.find({}, function(err, docs) {
   //          res.json(docs);
   //      });
   //  });

  app.post('/createNewOfferedApt', function(req, res) {
    var newOfferedApt = {};

    console.log("OBJECT INOFRMATION FOR INSERTING NEW OFFERED APT");
    for (var object in req.body){
      console.log(req.body[object]); // printing name of object for server debugging
      newOfferedApt[object] = req.body[object];
    }

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
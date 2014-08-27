// include models
var User = require('./models/user.js');
var DesiredApt = require('./models/desiredApt.js');
var OfferedApt = require('./models/offeredApt.js');

// include controllers
var userController = require('./controllers/userController.js');
var offeredAptsController = require('./controllers/offeredAptsController.js');

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

////////////////////// users ////////////////////////////////

  app.get('/users',ensureAuthenticated, userController.findAll);

  app.post('/users', userController.createNew);

  app.get('/users/:userId', ensureAuthenticated, userController.findById);

  app.put('/users/:userId', userController.editUser);

  app.delete('/users/:userId', userController.deleteUser);


////////////////////// desired apts ////////////////////////////////
   //  app.get('/desiredApts', function(req, res) {
    // Apt.find({}, function(err, docs) {
   //     res.json(docs);
   //   });
   //  });
  // app.post('/createNewDesiredApt', function(req, res) {
  //   var newDesiredApt = {};

  //   console.log("OBJECT INOFRMATION FOR INSERTING NEW DISRED APT");
  //   for (var object in req.body){
  //     console.log(req.body[object]); // printing name of object for server debugging
  //     newDesiredApt[object] = req.body[object];
  //   }

  //   var newDesiredAptInstance = new DesiredApt(newDesiredApt);

  //   newDesiredAptInstance.save(function(error, data){
  //     if(error){
  //         res.json(error);
  //     }
  //     else{
  //         res.json(data);
  //     }
  //   });
  // });
   //  app.get('/offeredApts', function(req, res) {
   //      Apt.find({}, function(err, docs) {
   //          res.json(docs);
   //      });
   //  });

////////////////////// offered apts ////////////////////////////////

  app.get('/offeredApts', ensureAuthenticated, offeredAptsController.findAll);

  app.post('/offeredApts', offeredAptsController.createNew);

  app.get('/getRecentOfferedApts', offeredAptsController.getRecentOfferedApts);

  app.post('/bla', function(req, res) {
    res.json(req.files);
  })
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("inside ensureAuthenticated, redirecting to login");
    res.redirect('/login');
}
// include models
var User = require('./models/user.js');
var DesiredApt = require('./models/desiredApt.js');
var OfferedApt = require('./models/offeredApt.js');

// include controllers
var userController = require('./controllers/userController.js');
var offeredAptsController = require('./controllers/offeredAptsController.js');
var desiredAptsController = require('./controllers/desiredAptsController.js');

var utils = require('./utils.js');

module.exports = function (app, passport) {
  require('./login.js')(passport);

  // set up routes
  app.get("/", function (req, res) {
      res.sendfile("./welcome.html");
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

  app.delete('/users/:userId', userController.deleteUser);


////////////////////// desired apts ////////////////////////////////

  app.get('/desiredApts', desiredAptsController.findAll);

  app.post('/desiredApts', desiredAptsController.createNew);

  app.delete('/desiredApts/:desiredAptId', desiredAptsController.deleteDesiredApt);

////////////////////// offered apts ////////////////////////////////

  app.get('/offeredApts', ensureAuthenticated, offeredAptsController.findAll);

  app.post('/offeredApts', offeredAptsController.createNew);

  app.get('/getRecentOfferedApts', offeredAptsController.getRecentOfferedApts);

  app.post('/searchOfferedApts', offeredAptsController.searchOfferedApts);

  app.delete('/offeredApts/:offeredAptId', offeredAptsController.deleteOfferedApt);

  app.post('/bla', function(req, res) {
    console.log(req.body);
    res.end();
  });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    console.log("inside ensureAuthenticated, redirecting to login");
    res.redirect('/login');
}
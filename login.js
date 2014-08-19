var User = require('./models/user.js');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// passport setup
module.exports = function (passport) {
	passport.use(new LocalStrategy(function(username, password, next){
	    User.findOne({username : username},function(err,user) {
			if(err) {
				return next(err);
			}

		    if(!user) {
		            return next(null, false, { message: 'Incorrect username.' });
		    }

		    var hash = crypto.createHash('sha1');
			hash.update(password);
			var result = hash.digest('hex');

			if (result === user.hashed_password) {
		        	return next(null, user._id);
		    }

		    else {
		    	next(null, false, { message: 'Incorrect password.' });
		    }

	    });
	}));

	passport.serializeUser(function(user, next) {
		next(null, user);
	});

	passport.deserializeUser(function(id, next) {
	    User.findById(id, function(err,user){        
	        if(err) {
	        	next(err);
	        }
	        
	    	next(null,user);
	    });
	});
}

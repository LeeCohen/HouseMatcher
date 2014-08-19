var User = require('./models/user.js');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// passport setup
module.exports = function (passport) {
	passport.use(new LocalStrategy(function(username, password, next){
		console.log('inside login with %s, %s', username, password);
	    User.findOne({'username' : username}, function(err,user) {
			if(err) {
				console.log("error");
				return next(err);
			}

		    if(!user) {
		    		console.log("!user");
		            return next(null, false);
		    }

		    var hash = crypto.createHash('sha1');
			hash.update(password);
			var result = hash.digest('hex');

			if (result == user.hashed_password) {
				console.log("success");
	        	return next(null, user._id);
		    }

		    else {
		    	console.log("fail");
		    	next(null, false);
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

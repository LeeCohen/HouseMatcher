var User = require('./models/user.js');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// passport setup
module.exports = function (passport) {
	passport.use(new LocalStrategy(function(username, password, next){
		console.log('inside login with %s, %s', username, password);
	    User.findOne({'Username' : username}, function(err,user) {
			if(err) {
				console.log("error");
				return next(err);
			}

		    if(!user) {
		    		console.log("user not found");
		            return next(null, false);
		    }

			//var result = calcHash('sha1', password);
			if (password === user.Hashed_password) {
				console.log("success");
	        	return next(null, user);
		    }

		    else {
		    	console.log("incorrect password");
		    	next(null, false);
		    }
	    });
	}));

	passport.serializeUser(function(user, next) {
		next(null, user);
	});

	passport.deserializeUser(function(user, next) {
		next(null, user);
	});
}

function calcHash(algorithm, password) {
	var hash = crypto.createHash(algorithm);
	hash.update(password);
	return hash.digest('hex');
}

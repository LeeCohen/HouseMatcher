var User = require('./models/user.js');
var crypto = require('crypto');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({username : username},function(err,user) {
		if(err) {
			return done(err);
		}

	    if(!user) {
	            return done(null, false, { message: 'Incorrect username.' });
	    }

	    var hash = crypto.createHash('sha1');
		hash.update(password);
		var result = hash.digest('hex');

		if (result == user.hash) {
	        	return done(null, user._id);
	    }

	    else {
	    	done(null, false, { message: 'Incorrect password.' });
	    }

    });
}));



passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err,user){        
        if(err) {
        	done(err);
        }
        
    	done(null,user);
    });
});

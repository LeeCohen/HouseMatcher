exports.buildNewObjFromReq = function(req) {
	var newObj = {};

    console.log("OBJECT INOFRMATION");
    for (var key in req.body){
		console.log(key + ': ' + req.body[key]); // printing for server debugging
		newObj[key] = req.body[key];
    }

    return newObj;
}

exports.appendCreator = function(req, aptModel, newAptInstanceCreator) {
	var user = req.user;

	for(key in aptModel.schema.paths) {
		if(key.indexOf('Creator') >= 0) {
			key = key.replace('Creator.', "");
			newAptInstanceCreator[key] =  user[key];
		}
	}
}

exports.updateUserWithNewApt = function (user, userModel, aptType, newApt) {	
    var updateUserWithNewAptCallback = function(error, user) {
    	console.log("new user information: " + user);
    }
    
    var update = {$push: {}};

    update.$push[aptType] = newApt._id;

    userModel.findOneAndUpdate({_id: user._id}, update, updateUserWithNewAptCallback);
}
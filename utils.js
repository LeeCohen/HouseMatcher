var nodemailer = require('nodemailer');

exports.buildNewObjFromReq = function(req) {
	var newObj = {};

    console.log("OBJECT INOFRMATION");
    for (var key in req.body){
		if(req.body[key] !== '') {
			console.log(key + ': ' + req.body[key]); // printing for server debugging
			newObj[key] = req.body[key];
		}
    }

    return newObj;
}

exports.appendCreator = function(req, aptModel, newAptInstanceCreator) {
	var user = req.user;

	if(newAptInstanceCreator) {
		for(key in aptModel.schema.paths) {
			if(key.indexOf('Creator') >= 0) {
				key = key.replace('Creator.', "");
				newAptInstanceCreator[key] =  user[key];
			}
		}
	}
}

exports.updateUserWithNewApt = function (user, userModel, aptType, newApt) {	
    var updateUserWithNewAptCallback = function(error, user) {
    	console.log("user updated");
    }
    
    var update = {$push: {}};
    update.$push[aptType] = newApt._id;
    userModel.findOneAndUpdate({_id: user._id}, update, updateUserWithNewAptCallback);
}

exports.notifyDesiredAptsCreators = function(newOfferedApt, desiredApts) {
	desiredApts.forEach(function(desiredApt) {
		console.log('sending mail to ' + desiredApt.Creator.First_name + ' with email address: ' + 
			desiredApt.Creator.Email);

		var to = desiredApt.Creator.Email;
		var subject = "A new apartment found by HouseMatcher";
		var content = 'Hello ' + desiredApt.Creator.First_name;
		content += '. A new apartment for rental that matches to what you are looking for has just entered HouseMatcher, go check it out';
		sendMail(to, subject, content);
	});
}

function sendMail(to, subject, content) {
	var transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'housematcherapp@gmail.com',
	        pass: 'HouseMatcherAppIsAwesome'
	    }
	});

	transporter.sendMail({
	    to: to,
	    subject: subject,
	    text: content
	});
}
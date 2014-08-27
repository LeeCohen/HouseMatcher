exports.buildNewObjFromReq = function(req) {
	var newObj = {};

    console.log("OBJECT INOFRMATION FOR INSERTING");
    for (var key in req.body){
		console.log(key + ': ' + req.body[key]); // printing name of object for server debugging
		newObj[key] = req.body[key];
    }

    return newObj;
}
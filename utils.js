exports.buildNewObjFromReq = function(req) {
	var newObj = {};

    console.log("OBJECT INOFRMATION FOR INSERTING");
    for (var object in req.body){
		console.log(req.body[object]); // printing name of object for server debugging
		newObj[object] = req.body[object];
    }

    return newObj;
}
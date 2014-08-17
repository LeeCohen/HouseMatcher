var express    = require('express'); 		
var app        = express(); 				
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var fs = require('fs');

require("./routes")(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/project');


app.listen(port, function() {
    console.log('Listening on port %d', port);
});

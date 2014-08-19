var flash 	   = require('connect-flash');
var express    = require('express'); 		
var app        = express(); 				
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');
var port 	   = process.env.PORT || 3000;
var fs   	   = require('fs');

app.use(flash()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/project');

require("./routes")(app, passport);


app.listen(port, function() {
    console.log('Listening on port %d', port);
});

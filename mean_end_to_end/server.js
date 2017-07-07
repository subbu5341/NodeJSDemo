/*var Model = require('./models/model.js');*/
var express = require('express');
var mongoose = require('mongoose');
var router = require('./models/routes.js')

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());
app.use(session({secret:"mycookies", resave:false, saveUninitialized:true, cookie: { maxAge: 6000}}))

app.get('/user/:user',function(request, response){
	response.cookie('name', request.params.user)
			.send('<p>cookie Set: <a href="/user">view here</a></p>');
})
app.get('/user',function(request, response){
	//response.send(request.cookies.name);
	response.clearCookie('name')
		.send(request.cookies.name);
})

// Connect to mongoDatabase
var db = "mongodb://localhost/mean_end_to_end";
mongoose.connect(db, function(err, response){
	if(err){
		console.log('Failed to connected to' +' '+db);
	}
	else {
		console.log('Connected to '+ db)
	}
});

app.use('/', router);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000

app.listen(port, function(){
	console.log('Express server Listening on port' +' '+ port);
})
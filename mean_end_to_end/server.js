var Model = require('./models/model.js');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

var db = "mongodb://subbu:Honey@0716@ds127492.mlab.com:27492/heroku_cslwsczj";

mongoose.connect(db, function(err, response){
	if(err){
		console.log('Failed to connected to' +' '+db);
	}
	else {
		console.log('Connected to '+ db)
	}
});

var router = express.Router();

//GET

router.get('/api/users', function(request, response){
	Model.find({}, function(err,users){
		if(err){
			response.status(404).send(err);
		}
		else {
			response.status(200).send(users);
		}
	})
})

// DELETE

router.delete('/api/users/:id', function(request, response){
	var id = request.params.id;
	Model.remove({_id: id}, function(err, res){
		if(err){
			response.status(500).send(err);
		}
		else {
			response.status(200).send({message: 'success on deleting user'});
		}
	})
})

// PUT

router.put('/api/users', function(request, response){

	Model.findById(request.body._id, function(err, user){
		if(err){
			response.status(404).send(err);
		}
		else {
			user.update(request.body, function(err, success){
				if(err){
					response.send(err)
				}
				else {
					response.status(200).send({message: 'success'})
				}
			});
		}
	})

});

// POST

router.post('/api/users', function(request, response){
	console.log(request.body);
	var model = new Model();
	model.name = request.body.name;
	model.age = request.body.age;
	model.save(function(err, user){
		if(err){
			response.status(500).send(err)
		}
		else {
			response.status(201).send(user)
		}
	});
});

app.use('/', router);



app.use(morgan('dev'));

app.use(express.static('public'));

/*app.get('/home', function(request, response){
	response.status(200).send("<h1>Welcome to the mean stack</h1>")
})*/

app.listen(3000, function(){
	console.log('Listening on port 3000');
})
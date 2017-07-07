var express = require('express');
var Model = require('./model.js');
var router = express.Router();

//GET
router.get('/api/users', function(request, response){
	Model.find({"age":{$lt:30}}, function(err,users){
		if(err && !request.session.user){
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

// Login Check POST
router.post('/api/login', function(request, response){
	console.log(request.body);
	
	var username = request.body.username;
	var password = request.body.password;
	//request.session.user = user;
	Model.findOne({username: username, password: password}, function(err, user){
		
		if(err){
			console.log(err);
			response.status(500).send(err)
			//next(err);
		}
		
		if(!user) {
			response.status(404).send(err)
		} 
		
		
		response.status(200).send(user);
		
		
	});
});

// POST
router.post('/api/users', function(request, response){
	console.log(request.body);

	var username = request.body.username;
	var password = request.body.password;
	var name = request.body.name;
	var age = request.body.age;
	
	var model = new Model();
	
	model.username = username;
	model.password = password;
	model.name = name;
	model.age = age;

	model.save(function(err, user){
		if(err){
			if(response.req.body.fbLoginCheck) {
				response.status(201).send(user)
			} else {
				response.status(500).send(err)
			}
			
		}
		else {
			response.status(201).send(user)
		}
	});
});

module.exports = router;

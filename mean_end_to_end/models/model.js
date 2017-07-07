var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
	username:{
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	 name:{ 
	 	type: String,
	 	required:true
	 },
	 age: { 
	 	type: Number,
	 	required:true
	 }
});

var model = mongoose.model('Users', UsersSchema);

module.exports = model;
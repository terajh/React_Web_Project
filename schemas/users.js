const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	}
})

moduel.exports = mongoose.model('User',userSchema);
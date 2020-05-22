const mongoose = require('mongoose');

const schema = {
	id: String,
	pw: String
};

module.exports = mongoose.model('accounts', schema);
const mongoose = require('mongoose');

const memschema = {
	name: String
};

module.exports = mongoose.model('members', memschema);
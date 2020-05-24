const router = require('express').Router();
const modMembers = require('../../../models/members');
const Error = require('../util/error');


const mfindById = async id => {
	const accountInfo = await modMembers.findOne({ "name":id });
	return accountInfo;
};

const misExistsById = async id => {
	const accountInfo = await mfindById(id);
	return !!accountInfo;
};

const misExistsAccountInfo = async (id, pw) => {
	if (!id || !pw) {
		throw new Error.InvalidRequest();
	}

	const accountInfo = await mfindById(id);
	if (!accountInfo) {
		throw new Error.IncorrectAccount();
	}

	return true;
};
const madd = async (id) => {
	if (!id) {
		return false;
	}

	const isExists = await misExistsById(id);

	if (isExists) {
		return false;
	}

	const newMemberInfo = new modMembers({"name":id});
	await newMemberInfo.save();
	return true;
};


router.get('/writemembers', (req,res,next)=>{
	try {
		const ret = madd(req.session.user.id);
		// console.log('writemembers',ret,req.session.user.id);
		res.send(ret);
	} catch (err) {
		next(err);
	}
})

router.get('/readmembers', (req,res)=>{
	modMembers.find({}, function(err, data) {
		if(err) throw err;
		console.log("readmembers",data);
		res.send(data);
	});
});

router.get('/removemembers', async (req, res, next) => {
	try {
		modMembers.deleteOne({"name":req.session.user.id}, (err)=>{
			console.log("remove name",req.session.user.id);
			res.send(true);											
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
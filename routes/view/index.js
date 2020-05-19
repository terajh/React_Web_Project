const router = require('express').Router();
const middlewares = require('../../middlewares');

router.get(['/', '/workspace'], middlewares.auth.isMember, require('./workspace'));
router.get(['/signup', '/signin'], middlewares.auth.isNotMember, require('./account'));
// member가 아닌지 맞는지 분기
module.exports = router;
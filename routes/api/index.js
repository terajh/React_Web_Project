const router = require('express').Router();

// '/api/~'로 요청되는 경우
router.use('/account', require('./account'));
router.use('/member',require('./member'));
router.use('/filemanager',require('./filemanager'));
module.exports = router;
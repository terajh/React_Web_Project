const router = require('express').Router();

router.use('/account', require('./account'));
router.use('/member',require('./member'));
router.use('/filemanager',require('./filemanager'));
module.exports = router;
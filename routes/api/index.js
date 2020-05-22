const router = require('express').Router();

router.use('/account', require('./account'));
router.use('/member',require('./member'));
module.exports = router;
const router = require('express').Router();

router.use('/auth', require('../modules/auth/routes'));
router.use('/listing', require('../modules/property/routes'));
router.use('/home', require('../modules/property/routes-home'));
router.use('/user', require('../modules/user/routes'));
router.use('/upload', require('../modules/multer/routes'));
router.use('/session', require('../modules/session/routes'));

module.exports = router;

const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { login, verify } = require('./controllers/index');

router.route('/login').post(bindController(login));
router.route('/verify').post(bindController(verify));

module.exports = router;

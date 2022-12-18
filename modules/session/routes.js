const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { get } = require('./controllers/index');

router.route('/').get(bindController(get));

module.exports = router;

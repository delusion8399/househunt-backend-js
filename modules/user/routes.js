const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { update, create, findOne } = require('./controllers');

router.route('/').post(bindController(create));

router.route('/:id').get(bindController(findOne)).patch(bindController(update));

module.exports = router;

const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { update, create, findOne, find } = require('./controllers');

router.route('/').post(bindController(create)).get(bindController(find));

router.route('/:id').get(bindController(findOne)).patch(bindController(update));

module.exports = router;

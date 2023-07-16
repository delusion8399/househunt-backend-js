const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { PropertyModel } = require('../models');
const { update, create, findOne, find, deleteUser } = require('./controllers');

router.route('/').post(bindController(create)).get(bindController(find));

router
  .route('/:id')
  .get(bindController(findOne))
  .patch(bindController(update))
  .delete(bindController(deleteUser));

module.exports = router;

const router = require('express').Router();
const bindController = require('../../utils/bindController');
const {
  find,
  findByUser,
  findBySlug,
  create,
  getFilters,
  deleteProperty,
  findById,
  update,
  get,
  getHotProperties,
} = require('./controllers');

router.route('/').get(bindController(find)).post(bindController(create));

router.route('/get-featured').get(bindController(get));

router.route('/get').get(bindController(findByUser));

router.route('/get-hot-properties').get(bindController(getHotProperties));

router
  .route('/:id')
  .get(bindController(findById))
  .delete(bindController(deleteProperty))
  .patch(bindController(update));

router.get('/filters', bindController(getFilters));
router.get('/slug/:slug', bindController(findBySlug));

module.exports = router;

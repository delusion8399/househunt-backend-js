const router = require('express').Router();
const bindController = require('../../utils/bindController');
const { homeData, getTrendingSearches } = require('./controllers');

router.route('/').get(bindController(homeData));

router.route('/trending-searches').get(bindController(getTrendingSearches));

module.exports = router;

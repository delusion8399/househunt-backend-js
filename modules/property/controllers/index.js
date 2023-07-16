const { find, findBySlug } = require('./find');
const findByUser = require('./findByUser');
const create = require('./create');
const getFilters = require('./getFilters');
const deleteProperty = require('./delete');
const findById = require('./findById');
const update = require('./update');
const { homeData, getTrendingSearches } = require('./home');
const get = require('./get');
const getHotProperties = require('./getHotProperties');

module.exports = {
  find,
  findByUser,
  findBySlug,
  create,
  getFilters,
  deleteProperty,
  findById,
  update,
  getTrendingSearches,
  homeData,
  get,
  getHotProperties,
};

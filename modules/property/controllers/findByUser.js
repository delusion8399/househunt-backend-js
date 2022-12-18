const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

function regexQuery(fields, value) {
  return fields.map((f) => ({
    [f]: {
      $regex: value,
      $options: 'i',
    },
  }));
}

async function findByUser({ user, page, limit, searchQuery }) {
  const pages = page * 1 || 1;
  const limits = limit * 1 || 10;
  const skip = (pages - 1) * limits;
  const query = {};

  if (user) {
    query.user = user;
  }

  if (searchQuery) {
    query.$or = regexQuery(
      ['title', 'address.city', 'listingType'],
      searchQuery,
    );
  }

  const [listings, total] = await Promise.all([
    PropertyModel.find(query).skip(skip).limit(limits).sort({ _id: -1 }).lean(),
    PropertyModel.countDocuments(query),
  ]);

  return ApiResponse('SUCCESS', {
    listings,
    total,
  });
}

module.exports = findByUser;

const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function getProperties(payload) {
  const { page, limit } = payload;

  const pages = page * 1 || 1;
  const limits = limit * 1 || 10;
  const skip = (pages - 1) * limits;

  const query = {};

  if (payload.propertyFor) {
    query['billing.propertyFor'] = payload.propertyFor;
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
module.exports = getProperties;

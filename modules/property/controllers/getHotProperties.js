const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function getHotProperties(payload) {
  const query = {};

  if (payload.user) {
    query.user = payload.user;
  }

  const hotProperties = await PropertyModel.find(query)
    .sort({ views: -1 })
    .limit(5)
    .lean();

  const data = [];

  for (const property of hotProperties) {
    data.push({ name: property.title, data: [property.views] });
  }

  return ApiResponse('SUCCESS', data);
}

module.exports = getHotProperties;

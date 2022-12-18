const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function findById({ id }) {
  const property = await PropertyModel.findOne({ _id: id });
  return ApiResponse('SUCCESS', property);
}

module.exports = findById;

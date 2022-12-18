const ApiResponse = require('../../../utils/apiResponse');
const { PropertyModel } = require('../../models');

async function deleteProperty({ id }) {
  await PropertyModel.findOneAndDelete({ _id: id });

  return ApiResponse('SUCCESS');
}

module.exports = deleteProperty;

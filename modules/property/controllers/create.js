const { PropertyModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function create(payload) {
  console.log(payload);
  const response = await PropertyModel.create({ ...payload });
  return ApiResponse('SUCCESS', response);
}

module.exports = create;

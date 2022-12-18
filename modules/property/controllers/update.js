const { PropertyModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function update(payload) {
  const response = await PropertyModel.findOneAndUpdate(
    { _id: payload.id },
    { ...payload },
  );
  return ApiResponse('SUCCESS', response);
}

module.exports = update;

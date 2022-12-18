const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function findOne(payload) {
  const { id } = payload;

  const user = await UserModel.findOne({ _id: id });

  return ApiResponse('SUCCESS', user);
}

module.exports = findOne;

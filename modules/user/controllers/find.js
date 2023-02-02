const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function find() {
  const user = await UserModel.find({ type: 'user' });

  return ApiResponse('SUCCESS', user);
}

module.exports = find;

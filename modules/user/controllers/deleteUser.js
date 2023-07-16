const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function deleteUser(payload) {
  const { id } = payload;

  const user = await UserModel.findOneAndDelete({ _id: id });

  return ApiResponse('SUCCESS', user);
}

module.exports = deleteUser;

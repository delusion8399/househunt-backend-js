const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');

async function find() {
  const [users, total] = await Promise.all([
    UserModel.find({ type: 'user' }),
    UserModel.countDocuments({ type: 'user' }),
  ]);

  return ApiResponse('SUCCESS', { users, total });
}

module.exports = find;

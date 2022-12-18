const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');
const { hashPassword } = require('../utils/hashing');

async function update(payload) {
  const { name, avatar, id, email, password } = payload;

  const updateQuery = {};

  if (name) {
    updateQuery.name = name;
  }

  if (avatar) {
    updateQuery.avatar = avatar;
  }

  if (email) {
    updateQuery.email = email;
  }

  if (password) {
    const hash = await hashPassword(password);
    updateQuery.password = hash;
  }

  const user = await UserModel.findOneAndUpdate({ _id: id }, updateQuery);

  return ApiResponse('SUCCESS', user);
}

module.exports = update;

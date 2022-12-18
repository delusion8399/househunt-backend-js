const { UserModel } = require('../../models');
const { hashPassword } = require('../utils/hashing');
const ApiResponse = require('../../../utils/apiResponse');

async function create(payload) {
  const { name, email, password } = payload;

  const hash = await hashPassword(password);

  const user = await UserModel.create({
    name,
    email,
    password: hash,
    type: 'user',
  });

  return ApiResponse('SUCCESS', user);
}

module.exports = create;

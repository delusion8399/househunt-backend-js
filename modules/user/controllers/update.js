const { UserModel } = require('../../models');
const ApiResponse = require('../../../utils/apiResponse');
const { hashPassword } = require('../utils/hashing');

async function update(payload) {
  const { name, avatar, id, email, password, address, mobile, state, country } =
    payload;

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

  if (address) {
    updateQuery.address = address;
  }

  if (mobile) {
    updateQuery.mobile = mobile;
  }

  if (state) {
    updateQuery.state = state;
  }

  if (country) {
    updateQuery.country = country;
  }

  const user = await UserModel.findOneAndUpdate({ _id: id }, updateQuery, {
    new: true,
  });

  console.log(payload, user);

  return ApiResponse('SUCCESS', user);
}

module.exports = update;

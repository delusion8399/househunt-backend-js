const ApiResponse = require('../../../utils/apiResponse');
const { UserModel, SessionModel } = require('../../models');
const { verifyPassword } = require('../../user/utils/hashing');
const { sign } = require('../../utils/jwt');

async function login(body, { ipAddress, userAgent }) {
  const { email, password } = body;
  const res = await UserModel.findOne({
    email: email.toLowerCase(),
  })
    .select('+password')
    .lean();

  if (!res) throw new Error('Invalid Credentials');

  const isMatch = await verifyPassword(password, res.password);

  if (!isMatch) throw new Error('Invalid Credentials');

  delete res.password;
  const jwt = await sign(
    {
      ...res,
    },
    'TOPSECRETWUWWUWUW',
  );

  const session = await SessionModel.create({
    loginType: 'Credentials',
    ipAddress: ipAddress.ip,
    userAgent,
    // eslint-disable-next-line no-underscore-dangle
    user: res._id,
  });

  console.log(session);
  return ApiResponse('SUCCESS', { token: jwt, ...res });
}

module.exports = login;

const ApiResponse = require('../../../utils/apiResponse');
const { verify } = require('../../utils/jwt');

async function verifyToken(body) {
  const { token } = body;

  const user = await verify(token, 'TOPSECRETWUWWUWUW');

  if (!user) throw new Error('Invalid Token');

  return ApiResponse('SUCCESS', user);
}

module.exports = verifyToken;

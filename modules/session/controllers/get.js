const ApiResponse = require('../../../utils/apiResponse');
const { SessionModel } = require('../../models');

async function get(payload) {
  const sessions = await SessionModel.find({ user: payload.user })
    .sort({ _id: -1 })
    .limit(5);

  return ApiResponse('SUCCESS', sessions);
}

module.exports = get;

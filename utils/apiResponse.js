const messages = {
  UNKNOWN: {
    data: {
      message: 'Something happened.',
      data: {},
      type: 'error',
    },
    status: 500,
  },
  SUCCESS: {
    data: {
      message: '',
      data: {},
      type: 'success',
    },
    status: 200,
  },
  ERROR: {
    data: {
      message: '',
      data: {},
      type: 'error',
    },
    status: 500,
  },
};

function ApiResponse(key, data = {}, extraText = '') {
  const response = JSON.parse(
    JSON.stringify(messages[key] || messages.UNKNOWN),
  );
  if (extraText) response.data.message += extraText;
  response.data.data = data;
  response.data.code = key;
  return response;
}

module.exports = ApiResponse;

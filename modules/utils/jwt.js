const jwt = require('jsonwebtoken');
const constants = require('../../bin/constants');

const SECRET = constants.JWT_SECRET;

async function sign(data) {
  return new Promise((resolve) => {
    jwt.sign(data, SECRET, (err, token) => {
      resolve(token);
    });
  });
}

async function verify(token) {
  return new Promise((resolve) => {
    jwt.verify(token, SECRET, (err, data) => {
      resolve(data);
    });
  });
}

module.exports = { verify, sign };

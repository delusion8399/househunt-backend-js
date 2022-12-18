const bcrypt = require('bcrypt');
const constants = require('../../../bin/constants');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, constants.saltRound);
  return hashedPassword;
}

async function verifyPassword(plainTextPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };

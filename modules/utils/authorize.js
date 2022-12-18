const jwt = require('./jwt');

async function verifyAppToken(req, res, next) {
  try {
    const { token } = req.headers;
    if (!token) throw new Error('AUTH_TOKEN_MISSING');
    const user = await jwt.verify(token);
    req.session = { userId: user._id };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { verifyAppToken };

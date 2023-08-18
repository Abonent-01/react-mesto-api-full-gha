const jwt = require('jsonwebtoken');
const ERROR_CODE_AUTH = require('../error/authError');
require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const auth = (req, res, next) => {
  const token = jwt.sign(
    { _id: user._id },
    NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
  );

  if (!token) {
    return next(new ERROR_CODE_AUTH('Error...'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return next(new ERROR_CODE_AUTH('Error...'));
  }

  req.user = payload;
  next();
};

module.exports = auth;

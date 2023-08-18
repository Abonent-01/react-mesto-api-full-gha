const jwt = require('jsonwebtoken');
const ERROR_CODE_AUTH = require('../error/authError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new ERROR_CODE_AUTH('authErr'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
  } catch (err) {
    next(new ERROR_CODE_AUTH('AuthErr'));
    return;
  }
  req.user = payload;
  next();
}

module.exports = auth;

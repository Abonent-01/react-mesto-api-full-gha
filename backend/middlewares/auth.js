const jwt = require('jsonwebtoken');
const ERROR_CODE_AUTH = require('../error/authError');


module.exports = (req, res, next) => {
  const { authorization } = request.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ERROR_CODE_AUTH('eee');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
  } catch (err) {
    return next(new ERROR_CODE_AUTH('eee'));
  }

  request.user = payload;
  return next();
};

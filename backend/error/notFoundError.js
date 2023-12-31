const { ERROR_CODE_NOT_FOUND } = require('./error')

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_NOT_FOUND;
  }
}

module.exports = NotFoundError;
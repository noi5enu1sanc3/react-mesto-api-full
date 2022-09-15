const { ERROR_CODE_VALIDATION_ERROR } = require('../constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_VALIDATION_ERROR;
  }
}

module.exports = ValidationError;

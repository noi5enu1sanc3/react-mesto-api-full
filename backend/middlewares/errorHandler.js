const { ERROR_CODE_INTERNAL_SERVER_ERROR, serverErrorMessage } = require('../helpers/constants');

module.exports.errorHandler = (err, req, res, next) => {
  const message = err.message || serverErrorMessage;
  const statusCode = err.statusCode || ERROR_CODE_INTERNAL_SERVER_ERROR;
  res.status(statusCode).send({ message });
  next();
};

const ERROR_CODE_VALIDATION_ERROR = 400;
const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_CONFLICT = 409;
const ERROR_CODE_INTERNAL_SERVER_ERROR = 500;

const cardNotFoundMessage = 'Card with this id not found';
const userNotFoundMessage = 'User with this id not found';
const pageNotFoundMessage = 'Page does not exist';
const wrongEmailOrPasswordMessage = 'Wrong email or password';
const serverErrorMessage = 'Something went wrong. Please try again later';
const authorizationErrorMessage = 'Authorization required';
const forbiddenErrorMessage = 'Only allowed to delete your own cards';
const validationErrorMessage = 'Validation error';
const userWithThisEmailAlreadyExistMessage = 'User with this email already exists';

// eslint-disable-next-line no-useless-escape
const linkRegex = /^https?:\/\/(www\.)?[a-zA-z\d\-]+\.[\w\d\-\._~:\/?#\[\]@!\$&'\(\)*\+,;=]{2,}#?$/;

module.exports = {
  ERROR_CODE_VALIDATION_ERROR,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_INTERNAL_SERVER_ERROR,
  cardNotFoundMessage,
  userNotFoundMessage,
  pageNotFoundMessage,
  wrongEmailOrPasswordMessage,
  serverErrorMessage,
  authorizationErrorMessage,
  forbiddenErrorMessage,
  validationErrorMessage,
  userWithThisEmailAlreadyExistMessage,
  linkRegex,
};

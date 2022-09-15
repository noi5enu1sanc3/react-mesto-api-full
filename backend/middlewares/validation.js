const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { linkRegex } = require('../helpers/constants');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(linkRegex),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegex),
  }),
});

const validateGetCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});
module.exports = {
  validateLogin,
  validateGetUserById,
  validateCreateUser,
  validateUpdateUserProfile,
  validateUpdateUserAvatar,
  validateCreateCard,
  validateGetCardById,
};

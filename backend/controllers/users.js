const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ValidationError = require('../helpers/errors/ValidationError');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const ConflictError = require('../helpers/errors/ConflictError');
const {
  userNotFoundMessage,
  wrongEmailOrPasswordMessage,
  validationErrorMessage,
  userWithThisEmailAlreadyExistMessage,
} = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ data: user.toJSON() });
  } catch (err) {
    next(new UnauthorizedError(wrongEmailOrPasswordMessage));
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(() => next(new NotFoundError(userNotFoundMessage)));
    res.send({ data: user });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .orFail(() => next(new NotFoundError(userNotFoundMessage)));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    res.send({ data: user.toJSON() });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else if (err.code === 11000) {
      next(new ConflictError(userWithThisEmailAlreadyExistMessage));
    } else {
      next(err);
    }
  }
};

const updateUserProfile = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
    })
      .orFail(() => next(new NotFoundError(userNotFoundMessage)));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
    })
      .orFail(() => next(new NotFoundError(userNotFoundMessage)));
    res.send({ data: user });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError
      || err instanceof mongoose.Error.CastError) {
      next(new ValidationError(`${validationErrorMessage}: ${err.message}`));
    } else {
      next(err);
    }
  }
};

module.exports = {
  login, getUserInfo, getUsers, findUserById, createUser, updateUserProfile, updateUserAvatar,
};

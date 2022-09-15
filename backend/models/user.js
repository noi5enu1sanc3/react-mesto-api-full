const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const { wrongEmailOrPasswordMessage, linkRegex } = require('../helpers/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: linkRegex,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'Non-valid email'],
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema
  .methods
  .toJSON = function hidePassword() {
    const user = this.toObject();
    delete user.password;
    return user;
  };

userSchema
  .statics
  .findUserByCredentials = async function findUserByCredentials(email, password, next) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return next(new UnauthorizedError(wrongEmailOrPasswordMessage));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new UnauthorizedError(wrongEmailOrPasswordMessage));
    }
    return user;
  };

module.exports = mongoose.model('user', userSchema);

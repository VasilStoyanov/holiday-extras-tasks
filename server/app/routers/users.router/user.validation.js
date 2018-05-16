const {
  failedValidation,
  is,
  passedValidation,
  property,
} = require('../../../utils');

const {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_PASSWORD_MAX_LENGTH,
} = require('./../../../models/user.model/user.model.constants');

const {
  REQUIRED,
  INVALID_MIN_LENGTH,
  INVALID_MAX_LENGTH,
  INVALID_ARGUMENT,
} = require('./../../../utils/validator/data.validator.err.messages');

const objName = 'user';
const usernameDesiredType = 'string';
const passwordDesiredType = 'string';

const validateUser = (user) => {
  if (!property('username').in(user).exists) {
    return failedValidation(REQUIRED({
      objName,
      propName: 'username',
    }));
  } else if (!property('username').in(user).isOfType(usernameDesiredType)) {
    return failedValidation(INVALID_ARGUMENT({
      objName,
      propName: 'username',
      desiredType: usernameDesiredType,
    }));
  } else if (is(user.username.length).lessThan(USERNAME_MIN_LENGTH)) {
    return failedValidation(INVALID_MIN_LENGTH({
      objName,
      propName: 'username',
      desiredMinLength: USERNAME_MIN_LENGTH,
    }));
  } else if (is(user.username.length).greaterThan(USERNAME_MAX_LENGTH)) {
    return failedValidation(INVALID_MAX_LENGTH({
      objName,
      propName: 'username',
      desiredMaxLength: USERNAME_MAX_LENGTH,
    }));
  }

  if (!property('password').in(user).exists) {
    return failedValidation(REQUIRED({
      objName,
      propName: 'password',
    }));
  } else if (!property('password').in(user).isOfType(passwordDesiredType)) {
    return failedValidation(INVALID_ARGUMENT({
      objName,
      propName: 'password',
      desiredType: passwordDesiredType,
    }));
  } else if (is(user.password.length).lessThan(USER_PASSWORD_MIN_LENGTH)) {
    return failedValidation(INVALID_MIN_LENGTH({
      objName,
      propName: 'password',
      desiredMinLength: USER_PASSWORD_MIN_LENGTH,
    }));
  } else if (is(user.password.length).greaterThan(USER_PASSWORD_MAX_LENGTH)) {
    return failedValidation(INVALID_MAX_LENGTH({
      objName,
      propName: 'password',
      desiredMaxLength: USER_PASSWORD_MAX_LENGTH,
    }));
  }

  return passedValidation();
};

module.exports = { validateUser };

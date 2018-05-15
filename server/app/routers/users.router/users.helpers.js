const uuidv1 = require('uuid/v1');
const { userValidationSchema } = require('./../../../models/user.model/user.model');
const { hash, generateSalt } = require('../../../utils');
const { SALT_LENGTH } = require('./users.constants');

const userModelFields = userValidationSchema.getFields();

const createAuthResponse = ({ token, user }) => ({
  token,
  user: {
    id: user.userId,
    username: user.username,
  },
});

const hashPassword = saltLength => (password) => {
  const salt = generateSalt({ length: saltLength });
  return hash(password)(salt);
};

const createUserEntity = (user) => {
  const { hashingResult, salt } = hashPassword(SALT_LENGTH)(user.password);

  const userId = uuidv1();
  const creationDateTimestamp = Date.now();

  const result = userModelFields.reduce((acc, curr) => {
    if (!user[curr]) {
      return acc;
    }

    const userProperty = {
      [curr]: user[curr],
    };

    return Object.assign(acc, userProperty);
  }, {
    userId,
    username: user.username,
    hashedPwd: hashingResult,
    salt,
    creationDateTimestamp,
  });

  return result;
};

const userToViewModel = user => ({
  id: user.userId,
  username: user.username,
});
const validateUserBm = validationFunc => (userBm) => {
  const validationResult = validationFunc(userBm);
  if (!validationResult.isValid) {
    throw { errorMessage: validationResult.message };
  }
};
module.exports = {
  createAuthResponse,
  createUserEntity,
  userToViewModel,
  hashPassword,
  validateUserBm,
};

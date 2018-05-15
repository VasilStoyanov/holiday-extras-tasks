const { userValidationSchema } = require('./../../../models/user.model/user.model');

const userModelFields = userValidationSchema.getFields();

const createAuthResponse = ({ token, user }) => ({
  token,
  user: {
    id: user.userId,
    username: user.username,
  },
});

const createUserEntity = (user) => {
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
    forename: user.forename,
    surname: user.surname,
    creationDateTimestamp,
  });

  return result;
};

const userToViewModel = user => ({
  id: user._id,
  forename: user.forename,
  surname: user.forename,
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
  validateUserBm,
};

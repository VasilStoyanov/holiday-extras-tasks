const userToViewModel = user => ({
  id: user._id,
  forename: user.forename,
  surname: user.surname,
  createdOn: user.createdOn,
  email: user.email,
});

const toUserEntity = (userBm) => {
  const createdOn = Date.now();

  return { ...userBm, createdOn };
};

const validateUserBm = validationFunc => (userBm) => {
  const validationResult = validationFunc(userBm);
  if (!validationResult.isValid) {
    throw { errorMessage: validationResult.message };
  }
};

module.exports = {
  userToViewModel,
  validateUserBm,
  toUserEntity,
};

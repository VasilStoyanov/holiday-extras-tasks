const userToViewModel = user => ({
  id: user._id,
  forename: user.forename,
  surname: user.forename,
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

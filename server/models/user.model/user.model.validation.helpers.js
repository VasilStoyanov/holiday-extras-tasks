const { isArray, passedValidation, failedValidation } = require('./../../utils/validator/data.validator');
const { USER_ROLES_MUST_BE_ARRAY_OF_STRINGS } = require('./user.model.constants').errorMessages;

const validateUserRoles = (roles) => {
  if (!isArray(roles).andContainsOnlyItemsOfType('string')) {
    return failedValidation(USER_ROLES_MUST_BE_ARRAY_OF_STRINGS);
  }

  return passedValidation();
};

module.exports = { validateUserRoles };

const { createModelValidator } = require('./../model.validator.factory');
const createSchema = require('./../schema.factory');

const {
  USERS_COLLECTION_NAME,
  USERS_USERNAME_COLUMN_NAME,
  USER_EMAIL_MAX_LENGTH,
  USER_EMAIL_MIN_LENGTH,
  USER_FORENAME_MAX_LENGTH,
  USER_FORENAME_MIN_LENGTH,
  USER_SURNAME_MAX_LENGTH,
  USER_SURNAME_MIN_LENGTH,
} = require('./user.model.constants').constants;

const userUniqueFields = ['email'];
const userModelValidationRules = {
  email: {
    maxLength: USER_EMAIL_MAX_LENGTH,
    minLength: USER_EMAIL_MIN_LENGTH,
    required: true,
    type: 'string',
  },
  forename: {
    maxLength: USER_FORENAME_MAX_LENGTH,
    minLength: USER_FORENAME_MIN_LENGTH,
    required: true,
    type: 'string',
  },
  surname: {
    maxLength: USER_SURNAME_MAX_LENGTH,
    minLength: USER_SURNAME_MIN_LENGTH,
    type: 'string',
    required: true,
  },
  created: {
    type: 'number',
    required: true,
  },
};

const userValidationSchema = createSchema.forModel(USERS_COLLECTION_NAME)(userModelValidationRules);
const userModelValidator = createModelValidator(userValidationSchema);

module.exports = {
  userModelValidator,
  userValidationSchema,
  userUniqueFields,
  USERS_COLLECTION_NAME,
  USERS_USERNAME_COLUMN_NAME,
};

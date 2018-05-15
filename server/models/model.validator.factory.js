const { validator, passedValidation, failedValidation } = require('./../utils');

const INVALID_OBJECT_ERROR_MESSAGE = 'Invalid object';
const RULE_WITH_SUCH_KEY_NOT_FOUND_IN_SCHEMA_ERROR_MESSAGE = objectKeyName => (
  `${objectKeyName} not found in schema`
);

const validate = obj => (schema) => {
  const validationResult = validator.validate(obj).using(schema);
  if (!validationResult.isValid) {
    return failedValidation(validationResult.message);
  }

  return passedValidation();
};

const createModelValidator = modelSchema => ({
  validateModel: async (model = {}) => validate(model)(modelSchema.getAllRules()),
  validateObject: async (obj = {}) => {
    const objKeys = Object.keys(obj);
    if (objKeys.length < 1) {
      return failedValidation(INVALID_OBJECT_ERROR_MESSAGE);
    }

    const objectKeyName = objKeys[0];
    const objSchema = modelSchema.getRule(objectKeyName);
    if (Object.keys(objSchema).length < 1) {
      return failedValidation(RULE_WITH_SUCH_KEY_NOT_FOUND_IN_SCHEMA_ERROR_MESSAGE(objectKeyName));
    }

    return validate(obj)(objSchema);
  },
});

module.exports = {
  createModelValidator,
};

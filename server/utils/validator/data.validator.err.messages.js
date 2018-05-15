const ERROR_MESSAGES = Object.create(null);

ERROR_MESSAGES.REQUIRED = ({ objName, propName }) => (
  `${objName}.${propName} is required`
);

ERROR_MESSAGES.INVALID_MIN_LENGTH = ({ objName, propName, desiredMinLength }) => (
  `${objName}.${propName}'s length should NOT be less than ${desiredMinLength}!`
);

ERROR_MESSAGES.INVALID_MAX_LENGTH = ({ objName, propName, desiredMaxLength }) => (
  `${objName}.${propName}'s length should be less than ${desiredMaxLength}!`
);

ERROR_MESSAGES.OUT_OF_RANGE = name => (requiredMinLength, requiredMaxLength) => (
  `${name}'s length should be at least
   ${requiredMinLength} and maximum ${requiredMaxLength} long!`
);

ERROR_MESSAGES.INVALID_VALIDATION_RULE = name => (
  `${name} does not have either 'minLength' or
  'maxLength' validation properties!`
);

ERROR_MESSAGES.INVALID_ARGUMENT = ({ objName, propName, desiredType }) => (
  `Expected ${objName}.${propName} to exist and to be of type '${desiredType}'`
);

ERROR_MESSAGES.NO_VALIDATION_FUNCTIONS_PROVIDED = 'No validation functions were provided';
ERROR_MESSAGES.EXPECT_ARGUMENTS_TO_BE_ARRAY = (
  `At least one validation rule should be passed to the validation function
  and should be passed as an Array`
);

ERROR_MESSAGES.VALUE_CANNOT_BE_NAN = ({ objName, propName }) => (
  `${objName}.${propName} cannot be NaN!`
);

module.exports = ERROR_MESSAGES;

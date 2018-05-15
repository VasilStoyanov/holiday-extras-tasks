/* eslint-disable valid-typeof, no-continue, no-restricted-globals */

const {
  INVALID_ARGUMENT,
  INVALID_MAX_LENGTH,
  INVALID_MIN_LENGTH,
  REQUIRED,
  VALUE_CANNOT_BE_NAN,
} = require('./data.validator.err.messages');

const passedValidation = () => ({ isValid: true });
const failedValidation = message => ({ isValid: false, message });

const property = prop => ({ in: obj => ({
  exists: !!obj[prop],
  isOfType: type =>
    ((type === 'array') ? Array.isArray(obj[prop]) :
      (typeof obj[prop] === type)),
}),
});

const isArray = (potentialArray) => {
  const obj = Object.create(null);

  obj.value = (potentialArray && Array.isArray(potentialArray));

  obj.withLengthBiggerThan = minLength => (
    obj.value && potentialArray.length > minLength
  );

  obj.withLengthLessThan = maxLength => (
    obj.value && potentialArray.length < maxLength
  );

  obj.andContainsOnlyItemsOfType = (type) => {
    if (!obj.value) {
      return false;
    }

    const containsInvalidItem = potentialArray.some(element => typeof element !== type);
    if (containsInvalidItem) {
      return false;
    }

    return true;
  };

  return obj;
};

const is = value => ({
  lessThan: secondValue => (value < secondValue),
  lessOrEqualThan: secondValue => (value <= secondValue),
  greaterThan: secondValue => (value > secondValue),
  greaterOrEqualThan: secondValue => (value >= secondValue),
});

const validate = obj => ({
  usingSchema: (validationSchema) => {
    const schemaKeys = Object.keys(validationSchema);
    const objName = validationSchema.callerName;

    for (let i = 0; i < schemaKeys.length; i += 1) {
      const propName = schemaKeys[i];
      const currentRules = validationSchema[propName];
      const hasValue = property(propName).in(obj).exists;

      if (currentRules.required && !hasValue) {
        return failedValidation(REQUIRED({
          objName,
          propName,
        }));
      }

      if (!currentRules.required && !hasValue) {
        continue;
      }

      if (currentRules.type && !property(propName).in(obj).isOfType(currentRules.type)) {
        if (currentRules.type === 'number' && isNaN(obj[propName])) {
          return failedValidation(VALUE_CANNOT_BE_NAN({
            objName,
            propName,
          }));
        }

        return failedValidation(INVALID_ARGUMENT({
          objName,
          propName,
          desiredType: currentRules.type,
        }));
      }

      const { minLength } = currentRules;
      const { maxLength } = currentRules;

      if (minLength && is(obj[propName].length).lessThan(minLength)) {
        return failedValidation(INVALID_MIN_LENGTH({
          objName,
          propName,
          desiredMinLength: minLength,
        }));
      }

      if (maxLength && is(obj[propName].length).greaterThan(maxLength)) {
        return failedValidation(INVALID_MAX_LENGTH({
          objName,
          propName,
          desiredMaxLength: maxLength,
        }));
      }

      const currentRulesKeys = Object.keys(currentRules);
      for (let j = 0; j < currentRulesKeys.length; j += 1) {
        const currentRule = currentRulesKeys[j];
        if (typeof currentRules[currentRule] === 'function') {
          const validationResult = currentRules[currentRule](obj[propName]);
          if (!validationResult.isValid) {
            return failedValidation(validationResult.message);
          }
        }
      }
    }

    return passedValidation();
  },
});

const validator = Object.create(null);

validator.validate = obj => ({
  using: (validationSchema) => {
    if (isArray(obj).value) {
      for (let i = 0; i < obj.length; i += 1) {
        if (typeof obj[i] !== 'object') {
          return failedValidation(INVALID_ARGUMENT('object'));
        }

        const currentValidationResult = validate(obj[i]).usingSchema(validationSchema);
        if (!currentValidationResult.isValid) {
          return failedValidation(currentValidationResult.message);
        }
      }

      return passedValidation();
    }

    return validate(obj).usingSchema(validationSchema);
  },
});

module.exports = {
  failedValidation,
  is,
  isArray,
  passedValidation,
  property,
  validator,
};

const USERS_CONSTANTS = Object.create(null);

USERS_CONSTANTS.INCORRECT_PASSWORD = 'Incorrect password';
USERS_CONSTANTS.BAD_REQUEST_ERROR_MESSAGE = 'There was a problem processing your request';
USERS_CONSTANTS.DEFAULT_SALT_LENGTH = 16;

USERS_CONSTANTS.USERNAME_NOT_FOUND = username => `Username ${username} does not exist`;
USERS_CONSTANTS.USERID_NOT_FOUND = userid => `User with id ${userid} does not exist`;
USERS_CONSTANTS.PROPERTY_ALREADY_IN_USE = ({ property, value }) => (
  `${property} '${value}' is already in use`
);


module.exports = USERS_CONSTANTS;

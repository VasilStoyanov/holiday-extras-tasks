const colourLib = require('colour');

const NOT_A_FUNCTION_ERROR_MESSAGE = method =>
  `Logger: printer.${method} is not a function!`;

const colourThemes = {
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: ['yellow', 'underline'],
  debug: 'blue',
  error: 'red bold',
};

const colourThemeKeys = Object.keys(colourThemes);

colourLib.setTheme(colourThemes);

const logger = config => (message) => {
  if (typeof message !== 'string') {
    console.warn('Logger does not support printing objects');
    console.log(message);
    return;
  }
  const { printer, method, colourKey } = config;
  if (typeof printer[method] !== 'function') {
    throw NOT_A_FUNCTION_ERROR_MESSAGE(method);
  }

  if (colourKey && typeof colourKey === 'string') {
    const colourToLowerCase = colourKey.toLowerCase();
    if (colourThemeKeys.indexOf(colourToLowerCase) !== -1) {
      printer[method](message[colourToLowerCase]);
      return;
    }
  }

  printer[method](message);
};

const logMessage = logger({
  printer: console,
  method: 'info',
  colourKey: 'info',
});

const logWarnMessage = logger({
  printer: console,
  method: 'warn',
  colourKey: 'warn',
});

const logErrorMessage = logger({
  printer: console,
  method: 'error',
  colourKey: 'error',
});

const debug = logger({
  printer: console,
  method: 'log',
  colourKey: 'help',
});

module.exports = {
  debug,
  logger,
  logMessage,
  logWarnMessage,
  logErrorMessage,
};

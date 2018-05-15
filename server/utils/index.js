const glob = require('glob');

let utilities = Object.create(null);
const modulePaths = glob.sync(`${__dirname}/**/*.js`);

modulePaths.forEach((path) => {
  const currentModule = require(path);
  utilities = { ...utilities, ...currentModule };
});

module.exports = utilities;

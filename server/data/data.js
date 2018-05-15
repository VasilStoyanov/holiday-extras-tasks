/* eslint-disable global-require, import/no-dynamic-require */

const path = require('path');
const fs = require('fs');

const init = async db => fs.readdirSync(__dirname)
  .filter(file => file.includes('.data'))
  .reduce(async (acc, file) => {
    const modulePath = path.join(__dirname, file);
    const currentDataModule = require(modulePath);
    const accumulator = await acc;
    const initializedModule = await currentDataModule.init(db);
    return { ...accumulator, ...initializedModule };
  }, Promise.resolve({}));

module.exports = { init };

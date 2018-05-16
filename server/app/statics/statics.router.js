const path = require('path');

const PATH_TO_INDEX_HTML = path.join(
  __dirname,
  './../../../client/dist/index.html',
);

const attachTo = (app) => {
  app.get('/*', (req, res) => {
    res.sendFile(PATH_TO_INDEX_HTML);
  });
};

module.exports = { attachTo };

(async () => {
  const config = require('./config');
  const databaseLayer = require('./db');
  const dataLayer = require('./data');
  const applicationLayer = require('./app');
  const { logMessage, logWarnMessage, logErrorMessage } = require('./utils');

  const SERVER_INITIALIZATION_MESSAGE = ({ initialized, port = 3000 }) => (
    initialized ?
      `> Server running on localhost:${port}` :
      '(!) Server initialization aborted'
  );

  try {
    const db = await databaseLayer.init({
      connectionString: config.connectionString,
      dataSource: config.operatingDataSourceName,
    });

    const data = await dataLayer.init(db);
    const app = await applicationLayer.init(data);

    app.listen(config.PORT, () => {
      logMessage(SERVER_INITIALIZATION_MESSAGE({
        initialized: true,
        port: config.PORT,
      }));
    });
  } catch (errorMessage) {
    logErrorMessage(`${errorMessage}`);
    logWarnMessage(SERVER_INITIALIZATION_MESSAGE({ initialized: false }));
    process.exit(1);
  }
})();

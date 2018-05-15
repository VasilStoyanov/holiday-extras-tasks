const { MongoClient } = require('mongodb');
const { logMessage } = require('./../utils');

const CONNECTION_TO_DATABASE_FAILED_ERROR_MESSAGE = message =>
  (message ?
    `> Connection to database failed (is Mongo Daemon running?), message: ${message}` :
    '> Connection to database failed');

const CONNECTION_TO_DATABASE_SUCCESSFUL_MESSAGE = ({ connectionString, dataSource }) =>
  `> Database connected on: ${connectionString}, Data Source: ${dataSource}`;

const successfulConnectionToDb = ({ connectionString, dataSource }) => {
  logMessage(CONNECTION_TO_DATABASE_SUCCESSFUL_MESSAGE({
    connectionString,
    dataSource,
  }));
};

const init = async ({ connectionString, dataSource }) => {
  try {
    const client = await MongoClient.connect(`${connectionString}`);
    const db = await client.db(dataSource);

    successfulConnectionToDb({ connectionString, dataSource });
    return db;
  } catch (ex) {
    return Promise.reject(CONNECTION_TO_DATABASE_FAILED_ERROR_MESSAGE(ex.message));
  }
};

module.exports = { init };
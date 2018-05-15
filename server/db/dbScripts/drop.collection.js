const { connectionString, dataSources } = require('./../../config/config');
const { MongoClient } = require('mongodb');
const { logger } = require('./../../utils');

const COLLECTION_DROPED_SUCCESSFULLY_MESSAGE = collectionName => (
  `${collectionName} droped successfully!`
);

const FAILED_TO_DROP_COLLECTION_ERROR_MESSAGE = collectionName => (
  `Failed to drop: ${collectionName}!`
);

const params = process.argv.slice(2)
  .map(param => param.split('='))
  .reduce((acc, curr) => {
    const key = curr[0].toLowerCase();
    const value = curr[1].toLowerCase();

    const obj = {
      [key]: value,
    };

    return Object.assign(obj, acc);
  }, {});

const { datasource, collection } = params;

(async () => {
  const client = await MongoClient.connect(`${connectionString}`);
  const db = await client.db(dataSources(datasource));

  db.collection(collection).drop()
    .then(() => logger({
      printer: console,
      method: 'info',
      colour: 'green',
    })(COLLECTION_DROPED_SUCCESSFULLY_MESSAGE(collection)))
    .catch(error => logger({
      printer: console,
      method: 'error',
      colour: 'red',
    })(`${FAILED_TO_DROP_COLLECTION_ERROR_MESSAGE(collection)} ${error}`));
})();

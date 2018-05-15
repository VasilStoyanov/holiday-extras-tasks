const { creatable } = require('./creatable.factory.js');
const { readable } = require('./readable.factory.js');
const { updatable } = require('./updatable.factory.js');
const { deletable } = require('./deletable.factory.js');

const { pipe } = require('./../../utils');

const createUniqueFields = db => collection => (uniqueFields) => {
  const promiseCollection = [];

  uniqueFields.forEach(field => (
    promiseCollection.push(db.collection(collection).createIndex({
      [field]: 1,
    }, {
      unique: true,
    }))
  ));

  return Promise.all(promiseCollection);
};

const exists = obj => ({
  ...obj,
  exists: ({ fieldName, value }) => new Promise((resolve, reject) => {
    obj.getOneByFieldName(fieldName)(value)
      .then(object => (object ? resolve(true) : resolve(false)))
      .catch(dbError => reject(dbError));
  }),
});

const aggregation = db => collection => obj => ({
  ...obj,
  aggregationPipeline: (...operators) => db.collection(collection).aggregate(operators),
});

const CRUD = db => collection => validator => obj => pipe(
  creatable(db)(collection)(validator),
  readable(db)(collection),
  updatable(db)(collection)(validator),
  deletable(db)(collection),
)(obj);

module.exports = {
  creatable,
  readable,
  updatable,
  deletable,
  exists,
  createUniqueFields,
  CRUD,
  aggregation,
};

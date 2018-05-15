const { ObjectID } = require('mongodb');

const readable = db => collection => obj => ({
  ...obj,
  getAll: async () => {
    try {
      const dbResult = await db.collection(collection)
        .find()
        .toArray();

      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getByObjectId: async (id) => {
    try {
      const dbResult = await db.collection(collection)
        .findOne({
          _id: new ObjectID(id),
        });

      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getOneByFieldName: fieldName => async (value) => {
    try {
      const dbResult = db.collection(collection)
        .findOne({
          [fieldName]: value,
        });

      return dbResult;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  },

  getAllByFieldName: fieldName => value => db.collection(collection)
    .find({
      [fieldName]: value,
    })
    .toArray(),
});

module.exports = { readable };

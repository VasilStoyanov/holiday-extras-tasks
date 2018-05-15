const creatable = db => collection => validator => obj => ({
  ...obj,
  create: async (data) => {
    const validationResult = await validator.validateModel(data);
    if (!validationResult || !validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    return new Promise((resolve, reject) => {
      db.collection(collection)
        .insertOne(data)
        .then(dbResponse => resolve(dbResponse.ops[0]))
        .catch(dbError => reject(dbError));
    });
  },
});

module.exports = { creatable };

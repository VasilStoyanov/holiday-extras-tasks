const updatable = db => collection => validator => obj => ({
  ...obj,
  updateOneByProperty: async ({
    selector, match, propertyToUpdate, newValue,
  }) => {
    const validationResult = await validator.validateObject({ [propertyToUpdate]: newValue });
    if (!validationResult || !validationResult.isValid) {
      return Promise.reject(validationResult.message);
    }

    try {
      const dbResponse = await db.collection(collection)
        .updateOne({ [selector]: match }, {
          $set: { [propertyToUpdate]: newValue },
        });

      return dbResponse;
    } catch (dbException) {
      return Promise.reject(dbException);
    }
  },
});

module.exports = { updatable };

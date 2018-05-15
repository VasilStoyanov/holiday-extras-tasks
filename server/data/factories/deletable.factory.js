const deletable = db => collection => obj => (() => {
  const setDeletedState = async ({ findByProperty, match, deletedState }) => {
    const findConditions = { [findByProperty]: match };

    const action = deletedState
      ? { $set: { deleted: true } } :
      { $unset: { deleted: '' } };

    try {
      const dbResponse = await db.collection(collection).updateOne(findConditions, action);
      return dbResponse;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  };

  const permanentDelete = async ({ findByProperty, match }) => {
    try {
      const dbResponse = await db.collection(collection).remove({ [findByProperty]: match }, 1);
      return dbResponse;
    } catch (dbExeption) {
      return Promise.reject(dbExeption);
    }
  };

  return {
    ...obj,
    deleteOne: async ({ findByProperty, match }) => (
      setDeletedState({ findByProperty, match, deletedState: true })
    ),
    restore: async ({ findByProperty, match }) => (
      setDeletedState({ findByProperty, match, deletedState: false })
    ),
    permanentDelete,
  };
})();

module.exports = { deletable };

const { pipe } = require('./../../utils');
const { CRUD, createUniqueFields, exists, aggregation } = require('./../factories/data.factory');
const {
  userModelValidator,
  userUniqueFields,
  USERS_COLLECTION_NAME,
} = require('./../../models/user.model/user.model');

const fetchUserData = obj => ({
  ...obj,
  getByEmail: email => obj.getOneByFieldName('email')(email),
  getByForename: forename => obj.getOneByFieldName('forename')(forename),
  getBySurname: surname => obj.getOneByFieldName('surname')(surname),
});

const modifyUserData = obj => ({
  ...obj,
  updateForename: async ({ id, newForename }) => {
    try {
      const { result } = await obj.updateOneByProperty({
        selector: '_id',
        match: id,
        propertyToUpdate: 'forename',
        newValue: newForename,
      });

      return { modifiedObjects: result.nModified };
    } catch (ex) {
      return Promise.reject(ex);
    }
  },
});

const init = async (db) => {
  const createdUniqueUserFields = createUniqueFields(db)(USERS_COLLECTION_NAME);

  try {
    await createdUniqueUserFields(userUniqueFields);
  } catch (exception) {
    return Promise.reject(exception);
  }

  const users = pipe(
    CRUD(db)(USERS_COLLECTION_NAME)(userModelValidator),
    aggregation(db)(USERS_COLLECTION_NAME),
    fetchUserData,
    modifyUserData,
    exists,
  )(Object.create(null));

  return Object.freeze({ users });
};

module.exports = { init };

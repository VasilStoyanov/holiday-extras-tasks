const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { tap, map, flatMap, reduce, startWith, catchError } = require('rxjs/operators');
const { userToViewModel, toUserEntity } = require('./user.helpers');
const { userUniqueFields } = require('./../../../models/user.model/user.model');
const { PROPERTY_ALREADY_IN_USE } = require('./user.constants');
const { getStatusCode } = require('../../../utils');

const conflictStatusCode = getStatusCode('conflict');
const badRequestStatusCode = getStatusCode('badRequest');
const notFoundStatusCode = getStatusCode('notFound');


const init = (data) => {
  const userController = Object.create(null);

  userController.getAllUsers = () => data.user.getAll();

  userController.getUserById = async (userId) => {
    try {
      const foundUser = await data.user.getByObjectId(userId);
      return Promise.resolve(foundUser);
    } catch (exception) {
      return Promise.reject({ statusCode: notFoundStatusCode, errorMessage: 'No such user' });
    }
  };

  userController.createNewUser = user => (of(user)
    .pipe(
      flatMap(userObj => from(userUniqueFields)
        .pipe(
          flatMap(uniqueFieldName => fromPromise(data.user.exists({
            fieldName: uniqueFieldName,
            value: userObj[uniqueFieldName],
          }))
            .pipe(tap((exists) => {
              if (exists) {
                throw {
                  errorMessage: PROPERTY_ALREADY_IN_USE({
                    property: uniqueFieldName,
                    value: userObj[uniqueFieldName],
                  }),
                  statusCode: conflictStatusCode,
                };
              }
            }))),
          startWith({}),
          reduce(() => userObj),
        )),
      map(toUserEntity),
      flatMap(userEntity => data.user.create(userEntity)),
      map(userToViewModel),
      catchError(({ statusCode = badRequestStatusCode, errorMessage }) => Promise.reject({ statusCode, errorMessage })),
    )
  );

  return Object.freeze(userController);
};

module.exports = { init };

const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { tap, map, flatMap, take, skip, reduce, startWith, catchError } = require('rxjs/operators');

const { userToViewModel, toUserEntity } = require('./user.helpers');

const { PROPERTY_ALREADY_IN_USE } = require('./user.constants');

const { getStatusCode } = require('../../../utils');

const conflictStatusCode = getStatusCode('conflict');
const badRequestStatusCode = getStatusCode('badRequest');

const checkForUniqueFields = ['email'];

const init = (data) => {
  const userController = Object.create(null);

  userController.getAllUsers = () => data.user.getAll();

  userController.createNewUser = user => (of(user)
    .pipe(
      flatMap(userObj => from(checkForUniqueFields)
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

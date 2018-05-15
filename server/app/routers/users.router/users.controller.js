const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { tap, map, flatMap, take, skip, reduce, startWith } = require('rxjs/operators');
const { validateUserBm } = require('./users.helpers');

const {
  createAuthResponse,
  createUserEntity,
  userToViewModel,
  hashPassword,
} = require('./users.helpers');

const {
  PROPERTY_ALREADY_IN_USE,
  USERNAME_NOT_FOUND,
  USERID_NOT_FOUND,
  INCORRECT_PASSWORD,
  DEFAULT_SALT_LENGTH,
} = require('./users.constants');

const { getStatusCode } = require('../../../utils');
const { validateUser } = require('./users.validation');

const conflictStatusCode = getStatusCode('conflict');
const unauthorizedStatusCode = getStatusCode('unauthorized');

const checkForUniqueFields = ['username', 'email'];

const init = (data) => {
  const usersController = Object.create(null);

  usersController.getUsers = ({ username, usersToSkipCount = 0, usersToTakeCount = 1 }) => (
    fromPromise(data.users.aggregationPipeline({
      $match: {
        username: {
          $regex: `(.*${username}.*)`,
          $options: 'i',
        },
      },
    })
      .toArray())
      .pipe(
        flatMap(dbResult => from(dbResult)),
        skip(usersToSkipCount),
        take(usersToTakeCount),
        map(userToViewModel),
        startWith([]),
        reduce((acc, curr) => { acc.push(curr); return acc; }),
      )
  );


  usersController.createNewUser = user => (of(user)
    .pipe(
      tap(validateUserBm(validateUser)),
      flatMap(userObj => from(checkForUniqueFields)
        .pipe(
          flatMap(uniqueFieldName => fromPromise(data.users.exists({
            property: uniqueFieldName,
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
          reduce(() => userObj),
        )),
      map(createUserEntity),
      flatMap(userEntity => data.users.create(userEntity)),
      map(userToViewModel),
    )
  );

  return Object.freeze(usersController);
};

module.exports = { init };

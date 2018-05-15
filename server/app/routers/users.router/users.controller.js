const { of } = require('rxjs/observable/of');
const { from } = require('rxjs/observable/from');
const { fromPromise } = require('rxjs/observable/fromPromise');
const { tap, map, flatMap, take, skip, reduce, startWith, catchError, throwException } = require('rxjs/operators');

const {
  createUserEntity,
  userToViewModel,
} = require('./users.helpers');

const { PROPERTY_ALREADY_IN_USE } = require('./users.constants');

const { getStatusCode } = require('../../../utils');

const conflictStatusCode = getStatusCode('conflict');

const checkForUniqueFields = ['email'];

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
      flatMap(userObj => from(checkForUniqueFields)
        .pipe(
          tap(uniqueFieldName => console.log(userObj[uniqueFieldName])),
          flatMap(uniqueFieldName => fromPromise(data.users.exists({
            property: uniqueFieldName,
            value: userObj[uniqueFieldName],
          }))
            .pipe(tap((exists) => {
              console.log('exists: ', exists);
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
      catchError((error) => {
        console.log('HERE:');
        console.log(console.error(error));
        throw ({ statusCode: 400, errorMessage: error });
      }),
    )
  );

  return Object.freeze(usersController);
};

module.exports = { init };

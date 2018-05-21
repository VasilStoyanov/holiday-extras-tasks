// import { debounceTime, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import { ajax } from 'rxjs/observable/dom/ajax';

import { map, pluck, switchMap, debounceTime, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as axios from 'axios';

const USER_FETCH_DEBOUNCE_TIME_IN_MS = 200;

export const fetchUsersEpic = action$ =>
  action$.ofType('FETCH_ALL_USERS')
    .pipe(
      debounceTime(USER_FETCH_DEBOUNCE_TIME_IN_MS),
      switchMap(() => fromPromise(axios.get('http://localhost:3001/api/user'))),
      pluck('data'),
      map(users => ({ type: 'FETCH_ALL_USERS_COMPLETED', payload: users })),
    );

export const createNewUserEpic = action$ =>
  action$.ofType('CREATE_NEW_USER')
    .pipe(
      switchMap(action => fromPromise(axios.post(
        'http://localhost:3000/api/user/create',
        action.payload,
      ))),
      pluck('data'),
      map(user => ({ type: 'CREATE_NEW_USER_SUCCESS', payload: user })),
    );

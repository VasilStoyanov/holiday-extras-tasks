// import { debounceTime, switchMap, map, mergeMap, catchError, tap } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import { fromPromise } from 'rxjs/observable/fromPromise';
// import { ajax } from 'rxjs/observable/dom/ajax';
// import * as axios from 'axios';
import { mapTo } from 'rxjs/operators';

export const userEpic = action$ =>
  action$.ofType('FETCH_USERS')
    .pipe(mapTo('MAP TO WORKS :O'));

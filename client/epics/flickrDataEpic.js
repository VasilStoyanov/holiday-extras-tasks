import { map, pluck, switchMap, debounceTime } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as axios from 'axios';
import jQuery from 'jquery';

const DEBOUNCE_TIME_IN_MS = 200;

jQuery.get('https://api.flickr.com/services/feeds/photos_public.gne?tags=kitten&format=json&nojsoncallback=true')
  .then((response) => {
    console.log('here');
  })
  .catch((err) => {
    console.log('there');
  });

export const fetchFlickrData = action$ =>
  action$.ofType('FETCH_FLICKR_DATA')
    .pipe(
      debounceTime(DEBOUNCE_TIME_IN_MS),
      switchMap(() => fromPromise(axios.get('https://api.flickr.com/services/feeds/photos_public.gne?format=json'))),
      pluck('data'),
      map(flickrData => ({ type: 'FETCH_FLICKR_DATA_COMPLETED', payload: flickrData })),
    );

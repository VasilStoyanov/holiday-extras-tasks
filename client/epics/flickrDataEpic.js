import { map, pluck, switchMap, debounceTime } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as axios from 'axios';
import jQuery from 'jquery';

const DEBOUNCE_TIME_IN_MS = 200;
const flickrApiPoint = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

const getFlickerData = () => new Promise((resolve, reject) => {
  jQuery.ajax({
    url: flickrApiPoint,
    dataType: 'jsonp',
    data: { format: 'json' },
    success: (data) => {
      resolve(data);
    },
    error: (error) => {
      reject(error);
    },
  });
});

export const fetchFlickrData = action$ =>
  action$.ofType('FETCH_FLICKR_DATA')
    .pipe(
      debounceTime(DEBOUNCE_TIME_IN_MS),
      switchMap(() => fromPromise(getFlickerData())),
      map(flickrData => ({ type: 'FETCH_FLICKR_DATA_COMPLETED', payload: flickrData })),
    );

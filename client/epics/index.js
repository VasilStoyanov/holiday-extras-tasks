import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { fetchUsersEpic, createNewUserEpic } from './userEpic';
import { fetchFlickrData } from './flickrDataEpic';

export const rootEpic = combineEpics(
  fetchUsersEpic,
  createNewUserEpic,
  fetchFlickrData,
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;

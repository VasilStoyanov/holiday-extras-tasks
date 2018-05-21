import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { fetchUsersEpic, createNewUserEpic } from './user/userEpic';

export const rootEpic = combineEpics(fetchUsersEpic, createNewUserEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;

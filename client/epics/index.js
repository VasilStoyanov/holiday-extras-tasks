import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { userEpic } from './user/userEpic';

export const rootEpic = combineEpics(userEpic);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default epicMiddleware;

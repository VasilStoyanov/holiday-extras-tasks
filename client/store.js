import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import reducer from './reducers';
// import { createEpicMiddleware } from 'redux-observable';
// import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const middleware = applyMiddleware(
  createLogger(),
  promise(),
  epicMiddleware,
  thunk,
);

export default createStore(reducer, middleware);

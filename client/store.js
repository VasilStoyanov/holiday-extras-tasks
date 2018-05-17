import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers';
import epicMiddleware from './epics';

const middleware = applyMiddleware(
  createLogger(),
  promise(),
  epicMiddleware,
  thunk,
);

export default createStore(reducer, middleware);

import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import flickrDataReducer from './flickrData/flickrDataReducer';

export default combineReducers({
  userReducer,
  flickrDataReducer,
});

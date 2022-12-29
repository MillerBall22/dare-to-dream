import { combineReducers } from 'redux';
import { locationReducer } from './location/location.reducer';

import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer
});
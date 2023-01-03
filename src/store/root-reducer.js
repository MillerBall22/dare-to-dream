import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { cartReducer } from './cart/cart.reducer';
import { dropdownsReducer } from './dropdowns/dropdowns.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  dropdowns: dropdownsReducer
});
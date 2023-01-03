import { DROPDOWNS_ACTION_TYPES } from './dropdowns.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCartDropdown = (boolean) =>
  createAction(DROPDOWNS_ACTION_TYPES.SET_CART_DROPDOWN, boolean);

export const setLoginDropdown = (boolean) =>
  createAction(DROPDOWNS_ACTION_TYPES.SET_LOGIN_DROPDOWN, boolean);

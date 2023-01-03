import { DROPDOWNS_ACTION_TYPES } from './dropdowns.types';

const INITIAL_STATE = {
  cartDropdown: false,
  loginDropdown: false,

};

export const dropdownsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case DROPDOWNS_ACTION_TYPES.SET_CART_DROPDOWN:
      return {...state, cartDropdown:payload};
    case DROPDOWNS_ACTION_TYPES.SET_LOGIN_DROPDOWN:
      return { ...state, loginDropdown: payload };
    default:
      return state;
  }
};
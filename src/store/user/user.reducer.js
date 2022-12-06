import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAccountCardOpen: false,
  directReports: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {currentUser: payload, isAccountCardOpen: false };
    case USER_ACTION_TYPES.SET_IS_ACCOUNT_CARD_OPEN:
      return {
        ...state,
        isAccountCardOpen: payload,
      };
    default:
      return state;
  }
};
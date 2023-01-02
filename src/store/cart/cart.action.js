import { USER_ACTION_TYPES } from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const setIsAccountCardOpen = (boolean) =>
  createAction(USER_ACTION_TYPES.SET_IS_ACCOUNT_CARD_OPEN, boolean);
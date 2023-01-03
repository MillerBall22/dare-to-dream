import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const addToCart = (ticketId) =>
  createAction(CART_ACTION_TYPES.ADD_TO_CART, ticketId);

export const subtractFromCart = (ticketId) =>
  createAction(CART_ACTION_TYPES.SUBTRACT_FROM_CART, ticketId);

export const removeFromCart = (ticketId) =>
  createAction(CART_ACTION_TYPES.REMOVE_FROM_CART, ticketId);
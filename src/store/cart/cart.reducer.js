import { CART_ACTION_TYPES } from './cart.types';

const INITIAL_STATE = {
    cart: [
      {
        ticketTitle: '1 Ticket',
        ticketImageUrl: '/static/1 Ticket.svg',
        ticketId: "singleTicket",
        ticketPrice: 60,
        ticketQuantity: 0
      },
      {
        ticketTitle: '3 Tickets',
        ticketImageUrl: '/static/3 Tickets.svg',
        ticketId: "threeTickets",
        ticketPrice: 150,
        ticketQuantity: 0
      },
      {
        ticketTitle: '10 Tickets',
        ticketImageUrl: '/static/10 Tickets.svg',
        ticketId: "tenTickets",
        ticketPrice: 400,
        ticketQuantity: 0
      },
      {
        ticketTitle: '50/50 Tickets',
        ticketImageUrl: '/static/3 Tickets.svg',
        ticketId: "fiftyFiftyTickets",
        ticketPrice: 20,
        ticketQuantity: 0
      },
    ],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { cart } = state;
      const newCart = cart.map((item) => {
        if (payload === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: payload,
            ticketPrice: item.ticketPrice,
            ticketQuantity: item.ticketQuantity + 1
          }
          return newItem;
        } else {
          return item;
        }
      })
      return { cart: newCart };
    }
    case CART_ACTION_TYPES.SUBTRACT_FROM_CART: {
      const { cart } = state;
      const newCart = cart.map((item) => {
        if (payload === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: payload,
            ticketPrice: item.ticketPrice,
            ticketQuantity: item.ticketQuantity - 1
          }
          return newItem;
        } else {
          return item;
        }
      })
      return { ...state, cart: newCart };
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART: {
      const { cart } = state;
      const newCart = cart.map((item) => {
        if (payload === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: payload,
            ticketPrice: item.ticketPrice,
            ticketQuantity: 0
          }
          return newItem;
        } else {
          return item;
        }
      })
      return { ...state, cart: newCart };
    }
    default:
      return state;
  }
};
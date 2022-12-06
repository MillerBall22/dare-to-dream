import { createContext, useReducer } from "react";

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  ADD_TO_CART: "ADD_TO_CART",
  SUBTRACT_FROM_CART: "SUBTRACT_FROM_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_CART_DROPDOWN: "TOGGLE_CART_DROPDOWN",
  TOGGLE_LOGIN_DROPDOWN: "TOGGLE_LOGIN_DROPDOWN",
  TOGGLE_LOGIN: "TOGGLE_LOGIN",
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.ADD_TO_CART: {
      const {ticketId} = action.payload;
      const {cart} =state;
      const newCart = cart.map((item) => {
        if (ticketId === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: ticketId,
            ticketPrice: item.ticketPrice,
            ticketQuantity: item.ticketQuantity + 1
          }
          return newItem;
        } else {
          return item;
        }
      })
      return { ...state, cart: newCart };
    }
    case ACTION_TYPES.SUBTRACT_FROM_CART: {
      const {ticketId} = action.payload;
      const {cart} =state;
      const newCart = cart.map((item) => {
        if (ticketId === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: ticketId,
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
    case ACTION_TYPES.REMOVE_FROM_CART: {
      const {ticketId} = action.payload;
      const {cart} =state;
      const newCart = cart.map((item) => {
        if (ticketId === item.ticketId) {
          const newItem = {
            ticketTitle: item.ticketTitle,
            ticketImageUrl: item.ticketImageUrl,
            ticketId: ticketId,
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
    case ACTION_TYPES.TOGGLE_CART_DROPDOWN: {
      const newCartDropdown = action.payload.cartDropdown
      return { ...state, cartDropdown: newCartDropdown };
    }
    case ACTION_TYPES.TOGGLE_LOGIN_DROPDOWN: {
      const newLoginDropdown = action.payload.loginDropdown
      return { ...state, loginDropdown: newLoginDropdown };
    }
    case ACTION_TYPES.TOGGLE_LOGIN: {
      const newLogin = action.payload.toggleloggedin
      return { ...state, toggleLoggedin: newLogin };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
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
  cartDropdown: false,
  loginDropdown: false,
  toggleLoggedin: false
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

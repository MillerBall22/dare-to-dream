import { LOCATION_ACTION_TYPES } from './location.types';

const INITIAL_STATE = {
  inSaskatchewan: "No Location",
};

export const locationReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOCATION_ACTION_TYPES.SET_IN_SASKATCHEWAN:
      return {inSaskatchewan: payload};
    default:
      return state;
  }
};
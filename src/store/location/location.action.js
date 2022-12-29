import { LOCATION_ACTION_TYPES } from './location.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setInSaskatchewan = (result) =>
  createAction(LOCATION_ACTION_TYPES.SET_IN_SASKATCHEWAN, result);
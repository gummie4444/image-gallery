import { combineReducers } from 'redux';
import * as types from '../types';

const image = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_IMAGE_SUCCESS:
      return action.data;
    default:
      return state;
  }
};

const images = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_IMAGE_SUCCESS:
      return [...state, action.data];
    case types.CREATE_IMAGE_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_IMAGE:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

export default images;

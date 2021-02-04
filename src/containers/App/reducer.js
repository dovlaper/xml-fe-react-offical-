import produce from 'immer';
import { getItem } from '../../utils/localStorage';
import { getUserFromToken } from '../../utils/request';
import {
  FETCH_AUTHENTICATED_USER_SUCCESS,
  LOGOUT_SUCCESS,
  SET_TOKEN,
  SESSION_EXPIRED, 
  SET_ERROR,
} from './constants';

export const initialState = {
  token: getItem('token') || null,
  user: null,
  error: null,
};

/* eslint-disable default-case */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_AUTHENTICATED_USER_SUCCESS:
        draft.user = action.user;
        break;
      case LOGOUT_SUCCESS:
      case SESSION_EXPIRED:
        draft.user = null;
        draft.token = null;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        draft.user = getUserFromToken()
        break;
      case SET_ERROR:
        draft.error = action.payload;
      }
  });

export default appReducer;

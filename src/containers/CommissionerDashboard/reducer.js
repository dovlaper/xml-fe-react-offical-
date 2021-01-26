import produce from 'immer';
import { getItem } from '../../utils/localStorage';
import { getUserFromToken } from '../../utils/request';
import { SET_SILENCE_APPEALS } from './actions';
import {
  FETCH_AUTHENTICATED_USER_SUCCESS,
  LOGOUT_SUCCESS,
  SET_TOKEN,
  SESSION_EXPIRED
} from './constants';

export const initialState = {
  list: [],
};

/* eslint-disable default-case */
const commissionerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SILENCE_APPEALS:
        draft.list = action.list;
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
    }
  });

export default commissionerReducer;

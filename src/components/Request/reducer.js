import produce from 'immer';
import { SET_REQUESTS, ADD_REQUEST, SET_SEARCH } from './constants';

export const initialState = {
  xml: []
};

/* eslint-disable default-case */
const requestReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_REQUESTS:
        draft.xml = action.payload 
        break;
      case ADD_REQUEST:
        draft.xml = [...draft.xml, action.payload]
        break;
      case SET_SEARCH:
        draft.xml = [...draft.xml, action.payload]
    }
  });

export default requestReducer;

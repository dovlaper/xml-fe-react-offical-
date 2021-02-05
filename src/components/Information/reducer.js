import produce from 'immer';
import { ADD_INFORMATION, SET_INFORMATIONS, SET_SEARCH } from './constants';

export const initialState = {
  xml: []
};

/* eslint-disable default-case */
const informationReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_INFORMATIONS:
        draft.xml = action.payload
        break;
      case ADD_INFORMATION:
        draft.xml = [...draft.xml, action.payload]
        break;
      case SET_SEARCH:
        draft.xml = [...draft.xml, action.payload]
    }
  });

export default informationReducer;

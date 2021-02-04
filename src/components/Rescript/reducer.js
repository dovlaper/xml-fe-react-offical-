import produce from 'immer';
import { ADD_RESCRIPT, SET_ALL_RESCRIPTS } from './actions';

export const initialState = {
  rescripts: []
};

/* eslint-disable default-case */
const rescriptReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_RESCRIPTS:
        draft.rescripts = action.payload 
        break;
      case ADD_RESCRIPT:
        draft.rescripts = [...draft.rescripts, action.payload]
    }
  });

export default rescriptReducer;

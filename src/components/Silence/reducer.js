import produce from 'immer';
import { SET_SILENCE_APPEALS } from './constants';

export const initialState = {
  xml: []
};

/* eslint-disable default-case */
const silenceReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SILENCE_APPEALS:
        draft.xml = action.payload 
        break;
    }
  });

export default silenceReducer;

import produce from 'immer';
import { SET_SILENCE_APPEALS, ADD_SILENCE_APPEAL } from './constants';

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
      case ADD_SILENCE_APPEAL:
        draft.xml = [...draft.xml, action.payload]
        break;
    }
  });

export default silenceReducer;

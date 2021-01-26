import produce from 'immer';
import { SET_DECISION_APPEALS } from './constants';

export const initialState = {
  xml: ""
};

/* eslint-disable default-case */
const silenceReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DECISION_APPEALS:
        console.log("Payload", action.payload)
        draft.xml = action.payload
        break;
    }
  });

export default silenceReducer;

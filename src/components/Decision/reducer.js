import produce from 'immer';
import { ADD_DECISION_APPEAL, SET_DECISION_APPEALS } from './constants';

export const initialState = {
  xml: []
};

/* eslint-disable default-case */
const decisionReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_DECISION_APPEALS:
        draft.xml = action.payload
        break;
      case ADD_DECISION_APPEAL:
        draft.xml = [...draft.xml, action.payload]
        break;
    }
  });

export default decisionReducer;

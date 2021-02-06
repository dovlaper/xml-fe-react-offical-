import produce from 'immer';
import { SET_APPEAL_ANNOUNCEMENTS } from './constants';

export const initialState = {
  xml: []
};

/* eslint-disable default-case */
const appealAnnouncementsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_APPEAL_ANNOUNCEMENTS:
        console.log(action)
        draft.xml = action.payload
        break;
    }
  });

export default appealAnnouncementsReducer;

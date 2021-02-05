import produce from 'immer';
import { SET_REPORTS } from './constants';

export const initialState = {
  reports: []
};

/* eslint-disable default-case */
const reportsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_REPORTS:
        draft.reports = action.payload 
        break;
    }
  });

export default reportsReducer;

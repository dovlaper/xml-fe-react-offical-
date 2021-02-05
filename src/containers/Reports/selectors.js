import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectReports = state => state.reports || initialState;

const makeSelectReports = () =>
  createSelector(
    selectReports,
    substate => substate.reports
  );

export { makeSelectReports };

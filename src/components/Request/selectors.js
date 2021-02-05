import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRequest = state => state.request || initialState;

const makeSelectRequest = () =>
  createSelector(
    selectRequest,
    substate => substate.xml
  );

export { makeSelectRequest };

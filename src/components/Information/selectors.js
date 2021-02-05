import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectInformation = state => state.information || initialState;

const makeSelectInformation = () =>
  createSelector(
    selectInformation,
    substate => substate.xml
  );

export { makeSelectInformation };

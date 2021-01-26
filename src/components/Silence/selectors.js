import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSilence = state => state.silence || initialState;

const makeSelectSilence = () =>
  createSelector(
    selectSilence,
    substate => substate.xml
  );

export { makeSelectSilence };

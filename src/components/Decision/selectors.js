import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDecision = state => state.decision || initialState;

const makeSelectDecision = () =>
  createSelector(
    selectDecision,
    substate => substate.xml
  );

export { makeSelectDecision };

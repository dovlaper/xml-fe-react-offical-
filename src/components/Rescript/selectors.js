import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRescript = state => state.rescript || initialState;

const makeSelectRescript = () =>
  createSelector(
    selectRescript,
    substate => substate.rescripts
  );


export { makeSelectRescript };

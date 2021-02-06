import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppealAnnouncements = state => state.appealAnnouncement || initialState;

const makeSelectAppealAnnouncements = () =>
  createSelector(
    selectAppealAnnouncements,
    substate => substate.xml
  );

export { makeSelectAppealAnnouncements };

import {
    GET_APPEAL_ANNOUNCEMENTS,
    SET_APPEAL_ANNOUNCEMENTS,
    CREATE_ANSWER,
} from './constants';

export const getAppealAnnouncements = () => ({
    type: GET_APPEAL_ANNOUNCEMENTS
})

export const setAppealAnnouncements = (payload) => ({
    type: SET_APPEAL_ANNOUNCEMENTS,
    payload
})

export const createAnswer = (payload) => ({
    type: CREATE_ANSWER,
    payload
})
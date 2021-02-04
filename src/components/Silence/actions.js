import { GET_SILENCE_APPEALS, SET_SILENCE_APPEALS, CREATE_SILENCE_APPEAL, ADD_SILENCE_APPEAL, DOWNLOAD, ABORT_APPEAL } from "./constants";

export const getSilenceAppeal = (payload) => ({
    type: GET_SILENCE_APPEALS,
    payload
})

export const setSilenceAppeal = (payload) => ({
    type: SET_SILENCE_APPEALS,
    payload
})

export const createSilenceAppeal = payload => ({
    type: CREATE_SILENCE_APPEAL,
    payload
})

export const addSilenceAppeal = payload => ({
    type: ADD_SILENCE_APPEAL,
    payload
})

export const download = payload => ({
    type: DOWNLOAD,
    payload
})

export const abortAppeal = payload => ({
    type: ABORT_APPEAL,
    payload
})
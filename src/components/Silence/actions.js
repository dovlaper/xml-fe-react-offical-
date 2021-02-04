import { GET_SILENCE_APPEALS, SET_SILENCE_APPEALS, CREATE_SILENCE_APPEAL, ADD_SILENCE_APPEAL, DOWNLOAD } from "./constants";

export const getSilenceAppeal = () => ({
    type: GET_SILENCE_APPEALS
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
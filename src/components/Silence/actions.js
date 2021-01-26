import { GET_SILENCE_APPEALS, SET_SILENCE_APPEALS } from "./constants";

export const getSilenceAppeal = () => ({
    type: GET_SILENCE_APPEALS
})

export const setSilenceAppeal = (payload) => ({
    type: SET_SILENCE_APPEALS,
    payload
})
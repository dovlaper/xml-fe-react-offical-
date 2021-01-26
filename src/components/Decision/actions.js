import { GET_DECISION_APPEALS, SET_DECISION_APPEALS } from "./constants";

export const getDecisionAppeal = () => ({
    type: GET_DECISION_APPEALS
})

export const setDecisionAppeal = (payload) => ({
    type: SET_DECISION_APPEALS,
    payload
})
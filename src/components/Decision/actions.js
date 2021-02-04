import {
    GET_DECISION_APPEALS,
    SET_DECISION_APPEALS,
    CREATE_DECISION_APPEAL,
    ADD_DECISION_APPEAL
} from "./constants";

export const getDecisionAppeal = () => ({
    type: GET_DECISION_APPEALS
})

export const setDecisionAppeal = (payload) => ({
    type: SET_DECISION_APPEALS,
    payload
})

export const createDecisionAppeal = payload => ({
    type: CREATE_DECISION_APPEAL,
    payload
})


export const addDecisionAppeal = payload => ({
    type: ADD_DECISION_APPEAL,
    payload
})
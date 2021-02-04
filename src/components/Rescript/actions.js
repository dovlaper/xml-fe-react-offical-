export const RESCRIPT = '[Rescript]';

export const GET_ALL_RESCRIPTS = `${RESCRIPT} GET_ALL_RESCRIPTS`;
export const CREATE_RESCRIPT = `${RESCRIPT} CREATE_RESCRIPT`;
export const ADD_RESCRIPT = `${RESCRIPT} ADD_RESCRIPT`;
export const SET_ALL_RESCRIPTS = `${RESCRIPT} SET_ALL_RESCRIPTS`;

export const getAllRescripts = (payload) => ({
    type: GET_ALL_RESCRIPTS,
    payload
})

export const addRescript = (payload) => ({
    type: GET_ALL_RESCRIPTS,
    payload
})

export const createRescript = (payload) => ({
    type: CREATE_RESCRIPT,
    payload
})

export const setAllRescripts = (payload) => ({
    type: SET_ALL_RESCRIPTS,
    payload
})
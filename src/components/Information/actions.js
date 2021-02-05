import {
    GET_INFORMATIONS,
    SET_INFORMATIONS,
    CREATE_INFORMATION,
    ADD_INFORMATION,
    SEARCH,
    SET_SEARCH,
    FILTER,
    SET_FILTER,
} from "./constants";

export const getInformation = (payload) => ({
    type: GET_INFORMATIONS,
    payload
})

export const setInformation = (payload) => ({
    type: SET_INFORMATIONS,
    payload
})

export const createInformation = payload => ({
    type: CREATE_INFORMATION,
    payload
})


export const addInformation = payload => ({
    type: ADD_INFORMATION,
    payload
})

export const search = payload => ({
    type: SEARCH,
    payload
})

export const setSearch = payload => ({
    type: SET_SEARCH,
    payload
})

export const filter = payload => ({
    type: FILTER,
    payload
})

export const setFilter = payload => ({
    type: SET_FILTER,
    payload
})

import { GET_REPORTS, SET_REPORTS, GENERATE, SEARCH, SET_SEARCH } from "./constants";

export const getReports = () => ({
    type: GET_REPORTS,
})

export const setReports = (payload) => ({
    type: SET_REPORTS,
    payload,
})

export const generate = () => ({
    type: GENERATE,
})

export const search = payload => ({
    type: SEARCH,
    payload
})

export const setSearch = payload => ({
    type: SET_SEARCH,
    payload
})
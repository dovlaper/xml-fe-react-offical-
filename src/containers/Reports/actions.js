import { GET_REPORTS, SET_REPORTS } from "./constants";

export const getReports = () => ({
    type: GET_REPORTS,
})

export const setReports = (payload) => ({
    type: SET_REPORTS,
    payload,
})
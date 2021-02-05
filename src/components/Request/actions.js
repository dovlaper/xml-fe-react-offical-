import { SET_FILTER } from "../Information/constants";
import {
    GET_REQUESTS,
    SET_REQUESTS,
    CREATE_REQUEST,
    ADD_REQUEST,
    DOWNLOAD,
    FILTER,
    SEARCH,
    SET_SEARCH,
    REJECT
} from "./constants";

export const getRequests = (payload) => ({
    type: GET_REQUESTS,
    payload
})

export const setRequests = (payload) => ({
    type: SET_REQUESTS,
    payload
})

export const createRequest = payload => ({
    type: CREATE_REQUEST,
    payload
})

export const addRequest = payload => ({
    type: ADD_REQUEST,
    payload
})

export const download = payload => ({
    type: DOWNLOAD,
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

export const reject = payload => ({
    type: REJECT,
    payload
})
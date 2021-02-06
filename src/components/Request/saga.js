import { CREATE_REQUEST, CREATE_RESPONSE, GET_REQUESTS, REJECT, SEARCH, FILTER } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import { addRequest, setRequests, getRequests as getAll } from './actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";
export function* getRequests({payload}) {
    try {
        const all = payload || '';
        const { data }= yield call(() => 
          axios.get(
            `http://localhost:8083/api/requests/${all}`, 
            {
              data: null,
              headers: {
                'Content-Type': 'application/xml',
                'Authorization': `Bearer ${getItem('token')}`
              }
            }
          )
        )
        const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(data,"text/xml");
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zahtev.com", "ZahtevRoot")) 
        yield put(setRequests(list))
    } catch (error) {
        console.log(error)
    }
  }

export function* createRequestSaga({ payload }) {
  try {
      const { data } = yield call(() => 
          axios.post(
              "http://localhost:8083/api/requests/",
              payload,
              {
                headers: {
                  'Content-Type': 'application/xml',
                  'Authorization': `Bearer ${getItem('token')}`
                }              
              }
          )
      )
      const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(data,"text/xml");
      yield put(addRequest(xmlDoc.getElementsByTagNameNS("http://www.zahtev.com", "ZahtevRoot")[0]))
  } catch(error) {
      console.log(error)
  }
}

export function* search({payload}) {
    try {
      const {data} = yield call(()=> axios.get(
      `http://localhost:8083/api/requests/search/${payload}`,
        {
          headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${getItem('token')}`
          }
        }
      ))
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(data,"text/xml");
      
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zahtev.com", "ZahtevRoot")) 
      yield put(setRequests(list))
    } catch(error) {
      console.log(error)
    }
  }

  export function* reject({payload}) {
    try {
        const { data }= yield call(() => 
          axios.get(
            `http://localhost:8083/api/requests/reject/${payload}`, 
            {
              data: null,
              headers: {
                'Content-Type': 'application/xml',
                'Authorization': `Bearer ${getItem('token')}`
              }
            }
          )
        )
        yield put(getAll())
    } catch (error) {
        console.log(error)
    }
  }


  export function* filter({payload}) {
    try {
      console.log(payload);
      const {data} = yield call(()=> axios.post(
      `http://localhost:8083/api/requests/meta/search/`,
      payload,
        {
          headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${getItem('token')}`
          }
        }
      ))
      const parser = new DOMParser();
  
      const xmlDoc = parser.parseFromString(data,"text/xml");
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zahtev.com", "ZahtevRoot")) 
      yield put(setRequests(list))
    } catch(error) {
      console.log(error)
    }
  }


export default function* requestSaga() {
  yield takeLatest(GET_REQUESTS, getRequests);
  yield takeLatest(CREATE_REQUEST, createRequestSaga);
  yield takeLatest(SEARCH, search);
  yield takeLatest(REJECT, reject);
  yield takeLatest(FILTER, filter);
}
  
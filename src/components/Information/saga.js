import { ABORT_APPEAL, CREATE_INFORMATION, GET_INFORMATIONS, SEARCH, FILTER } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setInformation, getInformation as getAll } from './actions';
import { getItem } from "../../utils/localStorage";
import { setError } from "../../containers/App/actions";

export function* getInformation({payload}) {
  try {
      const all = payload || '';
      const { data }= yield call(() => 
        axios.get(
          `http://localhost:8083/api/information/${all}`, 
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
      
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.obavestenje.com", "ObavestenjeRoot")) 
      yield put(setInformation(list))
  } catch (error) {
      console.log(error)
  }
}

export function* createInformationSaga({ payload }) {
  try {
      const { data } = yield call(() => 
          axios.post(
              "http://localhost:8083/api/information/",
              payload,
              {
                headers: {
                  'Content-Type': 'application/xml',
                  'Authorization': `Bearer ${getItem('token')}`
                }        
              }
          )
      )
      yield put(getAll())
      // yield put(addInformation(xmlDoc.getElementsByTagNameNS("http://www.obavestenje.com", "ObavestenjeRoot")[0]  ))
  } catch(error) {
      console.log(error)
  }
}

export function* search({payload}) {
    try {
      const {data} = yield call(()=> axios.get(
      `http://localhost:8083/api/information/search/${payload}`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(data,"text/xml");
    
    const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
    yield put(setInformation(list))
  } catch(error) {
    console.log(error)
  }
}

export function* filter({payload}) {
  try {
    const {data} = yield call(()=> axios.post(
    `http://localhost:8083/api/information/meta/search/`,
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
  const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
  yield put(setInformation(list))
} catch(error) {
  console.log(error)
}
}

  export default function* InformationSaga() {
    yield takeLatest(GET_INFORMATIONS, getInformation);
    yield takeLatest(CREATE_INFORMATION, createInformationSaga);
    yield takeLatest(SEARCH, search)
    yield takeLatest(FILTER, filter)
  }
  
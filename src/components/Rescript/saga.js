import { 
    CREATE_RESCRIPT,
    GET_ALL_RESCRIPTS,
    setAllRescripts,
    createRescript,
    getAllRescripts,
    addRescript,
    SEARCH,
    FILTER,
} from "./actions";
import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { setRescript } from './actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";

export function* getAllRescriptsSaga() {
    try {
        const { data } = yield call(() => 
          axios.get(
            `http://localhost:8083/api/rescript/`, 
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
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.resenje.com", "ResenjeRoot")) 
        yield put(setAllRescripts(list))
    } catch (error) {
        console.log(error)
    }
}

export function* search({payload}) {
    try {
      const {data} = yield call(()=> axios.get(
      `http://localhost:8083/api/rescript/search/${payload}`,
        {
          headers: {
            'Content-Type': 'application/xml',
            'Authorization': `Bearer ${getItem('token')}`
          }
        }
      ))
      const parser = new DOMParser();
  
      const xmlDoc = parser.parseFromString(data,"text/xml");
      
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.resenje.com", "ResenjeRoot")) 
      yield put(setAllRescripts(list))
    } catch(error) {
      console.log(error)
    }
  }
  
  export function* filter({payload}) {
    try {
      console.log(payload);
      const {data} = yield call(()=> axios.post(
      `http://localhost:8083/api/rescript/meta/search/`,
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
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.resenje.com", "ResenjeRoot")) 
      yield put(setAllRescripts(list))
    } catch(error) {
      console.log(error)
    }
  }


export default function* silenceSaga() {
  yield takeLatest(GET_ALL_RESCRIPTS, getAllRescriptsSaga);
  yield takeLatest(SEARCH, search);
  yield takeLatest(FILTER, filter);
}
  
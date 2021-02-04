import { CREATE_SILENCE_APPEAL, GET_SILENCE_APPEALS, DOWNLOAD, ABORT_APPEAL } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import { setSilenceAppeal, addSilenceAppeal } from './actions';
import { setError } from '../../containers/App/actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";
export function* getSilenceAppeals({payload}) {
    try {
        const all = payload || '';
        const { data }= yield call(() => 
          axios.get(
            `http://localhost:8080/api/silenceappeal/${all}`, 
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
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbacutanje.com", "ZalbaCutanjeRoot")) 
        yield put(setSilenceAppeal(list))
    } catch (error) {
        console.log(error)
    }
  }

export function* createSilenceSaga({ payload }) {
  try {
      const { data } = yield call(() => 
          axios.post(
              "http://localhost:8080/api/silenceappeal/",
              payload,
              {
                  headers: {'Content-Type': 'application/xml'}
              }
          )
      )
      const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(data,"text/xml");
      yield put(addSilenceAppeal(xmlDoc.getElementsByTagNameNS("http://www.zalbacutanje.com", "ZalbaCutanjeRoot")[0]))
  } catch(error) {
      console.log(error)
  }
}

export function* download({ payload }) {
  try {
      yield call(() => 
          axios.get(
              `http://localhost:8080/api/silenceappeal/${payload.id}/generate?type=${payload.type}`,
              {
                  headers: {'Content-Type': 'application/xml'}
              }
          )
      )
    
  } catch(error) {
      console.log(error)
  }
}

export function* abortAppeal({payload}){
  try{
    yield call(()=> axios.delete(
      `http://localhost:8080/api/silenceappeal/${payload}`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
  } catch(error) {
    if(error.response.status === 400) {
      yield put(setError("Can't abort this appeal, you already received rescript!"))
    }
  }
}

export default function* silenceSaga() {
  yield takeLatest(GET_SILENCE_APPEALS, getSilenceAppeals);
  yield takeLatest(CREATE_SILENCE_APPEAL, createSilenceSaga);
  yield takeLatest(DOWNLOAD, download);
  yield takeLatest(ABORT_APPEAL, abortAppeal);
}
  
import { GET_SILENCE_APPEALS } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { setSilenceAppeal } from './actions';
import axios from 'axios';
export function* getSilenceAppeals(payload) {
    try {


        const { data }= yield call(() => 
          axios.get(
            "http://localhost:8080/api/silenceappeal/", 
            {
              data: null,
              headers: {'Content-Type': 'application/xml'}
            }
          )
        )
        const parser = new DOMParser();

        const xmlDoc = parser.parseFromString(data,"text/xml");
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbacutanje.com", "zalbaCutanje")) 
        yield put(setSilenceAppeal(list))
    } catch (error) {
        console.log(error)
    }
  }

export default function* silenceSaga() {
  yield takeLatest(GET_SILENCE_APPEALS, getSilenceAppeals);
}
  
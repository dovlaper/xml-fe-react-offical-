import { CREATE_ANSWER, GET_APPEAL_ANNOUNCEMENTS } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import { setAppealAnnouncements } from './actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";
export function* getAppealAnnouncements() {
    try {
        const { data }= yield call(() => 
          axios.get(
            `http://localhost:8083/api/appeal-announcement`, 
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
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbaobavestenje.com", "ObavestenjeZalba")) 
        yield put(setAppealAnnouncements(list))
    } catch (error) {
        console.log(error)
    }
  }

  export function* createAnswer({payload}) {
    try {
        const { data } = yield call(() => 
          axios.post(
            `http://localhost:8083/api/appeal-announcement/declare`,
            payload,
            {
              headers: {
                'Content-Type': 'application/xml',
                'Authorization': `Bearer ${getItem('token')}`
              }
            }
          )
        )
    } catch (error) {
        console.log(error)
    }
  }

export default function* requestSaga() {
  yield takeLatest(GET_APPEAL_ANNOUNCEMENTS, getAppealAnnouncements);
  yield takeLatest(CREATE_ANSWER, createAnswer);
}
  
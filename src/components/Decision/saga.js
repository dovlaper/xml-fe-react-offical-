import { CREATE_DECISION_APPEAL, GET_DECISION_APPEALS } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setDecisionAppeal, addDecisionAppeal } from './actions';
export function* getDecisionAppeal() {
  try {
      const { data }= yield call(() => 
        axios.get(
          "http://localhost:8080/api/decisionappeal/", 
          {
            data: null,
            headers: {'Content-Type': 'application/xml'}
          }
        )
      )
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(data,"text/xml");
      
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
      yield put(setDecisionAppeal(list))
  } catch (error) {
      console.log(error)
  }
}

export function* createDecisionSaga({ payload }) {
  try {
      const { data } = yield call(() => 
          axios.post(
              "http://localhost:8080/api/decisionappeal/",
              payload,
              {
                  headers: {'Content-Type': 'application/xml'}
              }
          )
      )
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data,"text/xml");
      yield put(addDecisionAppeal(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")[0]  ))
  } catch(error) {
      console.log(error)
  }
}
  
  export default function* DecisionSaga() {
    yield takeLatest(GET_DECISION_APPEALS, getDecisionAppeal);
    yield takeLatest(CREATE_DECISION_APPEAL, createDecisionSaga);
  }
  
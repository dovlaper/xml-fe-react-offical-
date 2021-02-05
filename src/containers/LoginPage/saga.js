import { takeLatest, call, put } from 'redux-saga/effects';
import { setItem } from '../../utils/localStorage';
import { DASHBOARD } from '../../routes';
import { setToken, fetchAuthenticatedUser } from '../App/actions';
import { loginSuccess, loginError } from './actions';
import { LOGIN_REQUEST } from './constants';
import axios from 'axios'
export function* authorize({ email, password }) {
  try {
    const {data} = yield call(() => 
      axios.post(
        "http://localhost:8083/auth/login/",
        `<User><email>${email}</email><password>${password}</password></User>`, 
        {
          headers: {'Content-Type': 'application/xml'}
        }
      )
    )
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data,"text/xml");
    const token = xmlDoc.getElementsByTagName("token")[0].innerHTML;   
    yield put(loginSuccess());
    yield call(setItem, 'token', token);
    yield put(setToken(token));
    // yield put(fetchAuthenticatedUser());
  } catch (error) {
    console.log(error)
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, authorize);
}

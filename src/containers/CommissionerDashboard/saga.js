import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { GET_SILENCE_APPEALS } from './actions';

export function* fetchUser() {
  try {
    const user = yield call(request, {
      url: '/auth/me',
      method: 'get'
    });
    yield put(fetchAuthenticatedUserSuccess(user));
  } catch (error) {
    //
  }
}

export default function* appSaga() {
  yield takeLatest(GET_SILENCE_APPEALS, getSilenceAppeals);
}

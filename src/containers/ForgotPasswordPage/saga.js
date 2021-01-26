import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { forgotPasswordSuccess, forgotPasswordError } from './actions';
import { FORGOT_PASSWORD_REQUEST } from './constants';

export function* forgotPassword({ email, meta: { setErrors } }) {
  try {
    yield call(request, {
      url: '/user/forgot-password',
      method: 'post',
      data: { email }
    });
    yield put(forgotPasswordSuccess());
  } catch (error) {
    console.log(error)
  }
}

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
}

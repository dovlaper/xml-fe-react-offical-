import { call, select, put } from 'redux-saga/effects';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';

import { setItem, removeItem, getItem } from './localStorage';

import { setToken, sessionExpired } from '../containers/App/actions';
import { makeSelectToken } from '../containers/App/selectors';

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
});

api.interceptors.response.use(
  response => mapKeys(response.data, (_, key) => camelCase(key)),
  error => Promise.reject(error.response)
);

export default function* request({ url, method, headers = {}, data = {} }) {
  try {
    let token = yield select(makeSelectToken());

    if (token) {
      if (Date.now() / 1000 >= jwtDecode(token).exp) {
        token = yield call(refreshToken, token);
      }

      headers.Authorization = `Bearer ${token}`;
    }

    return yield call(api, { method, url, headers:{'Content-Type': "application/xml"}, data });
  } catch (error) {
      console.log(error)
  }
}

export function getUserFromToken() {
  const token = getItem('token')
  if (token) {
    const user = jwtDecode(token)
    return {email: user.sub, role: user.role};
  }
  return null;
}

export function* refreshToken(prevToken) {
  const { accessToken: token } = yield call(api, {
    url: '/auth/refresh',
    method: 'post',
    headers: {
      Authorization: `Bearer ${prevToken}`
    }
  });

  yield call(setItem, 'token', token);

  yield put(setToken(token));

  return token;
}

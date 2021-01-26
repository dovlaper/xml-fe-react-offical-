import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectIsResetPasswordPending } from './selectors';
import { resetPassword } from './actions';
import ResetPasswordForm from './ResetPasswordForm';
import reducer from './reducer';
import saga from './saga';

const key = 'resetPassword';

export function ResetPasswordPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const isResetPasswordPending = useSelector(
    makeSelectIsResetPasswordPending()
  );
  const submitResetPasswordForm = useCallback(
    (...args) => dispatch(resetPassword(...args)),
    [dispatch]
  );

  return (
    <main>
      <title>Reset Password - XML</title>
      <h1>Reset password</h1>
      <ResetPasswordForm
        onSubmit={submitResetPasswordForm}
        isPending={isResetPasswordPending}
      />
    </main>
  );
}

export default ResetPasswordPage;

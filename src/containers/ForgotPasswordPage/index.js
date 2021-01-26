import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectIsForgotPasswordPending } from './selectors';
import { forgotPassword } from './actions';
import ForgotPasswordForm from './ForgotPasswordForm';
import reducer from './reducer';
import saga from './saga';

const key = 'forgotPassword';

function ForgotPasswordPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const isForgotPasswordPending = useSelector(
    makeSelectIsForgotPasswordPending()
  );
  const submitForgotPasswordForm = useCallback(
    (...args) => dispatch(forgotPassword(...args)),
    [dispatch]
  );


  return (
    <main>
        <title>Forgot Password - XMl</title>
      <h1>Forgot password</h1>
      <ForgotPasswordForm
        onSubmit={submitForgotPasswordForm}
        isPending={isForgotPasswordPending}
      />
    </main>
  );
}

export default ForgotPasswordPage;

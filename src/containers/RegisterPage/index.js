import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectIsRegisterPending } from './selectors';
import { register } from './actions';
import RegisterForm from './RegisterForm';
import reducer from './reducer';
import saga from './saga';
import { LOGIN } from '../../routes';

const key = 'register';

function RegisterPage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const isRegisterPending = useSelector(makeSelectIsRegisterPending());
  const submitRegisterForm = useCallback(
    (...args) => dispatch(register(...args)),
    [dispatch]
  );

  const renderPendingIndicator = <div>Please wait...</div>;

  return (
    <main>
      <title>Register - XML</title>
      <h1>Register</h1>
        <>
    
          <RegisterForm
            onSubmit={submitRegisterForm}
            isPending={isRegisterPending}
          />
          <Link to={LOGIN}>Login</Link>
        </>
    </main>
  );
}

export default RegisterPage;

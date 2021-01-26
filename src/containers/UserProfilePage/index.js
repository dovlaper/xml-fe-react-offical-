import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectUser } from '../App/selectors';
import {
  makeSelectIsUpdateUserPending,
  makeSelectIsChangePasswordPending
} from './selectors';
import { updateUser, changePassword } from './actions';
import UpdateUserForm from './UpdateUserForm';
import ChangePasswordForm from './ChangePasswordForm';
import reducer from './reducer';
import saga from './saga';

const key = 'userProfile';

function UserProfilePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dispatch = useDispatch();
  const user = useSelector(makeSelectUser());
  const isUpdateUserPending = useSelector(makeSelectIsUpdateUserPending());
  const isChangePasswordPending = useSelector(
    makeSelectIsChangePasswordPending()
  );
  const submitUpdateUserForm = useCallback(
    (...args) => dispatch(updateUser(...args)),
    [dispatch]
  );
  const submitChangePasswordForm = useCallback(
    (...args) => dispatch(changePassword(...args)),
    [dispatch]
  );

  return (
    <main>
      <title>Profile - XML</title>
      <UpdateUserForm
        user={user}
        isPending={isUpdateUserPending}
        onSubmit={submitUpdateUserForm}
      />
      <ChangePasswordForm
        isPending={isChangePasswordPending}
        onSubmit={submitChangePasswordForm}
      />
    </main>
  );
}

export default UserProfilePage;

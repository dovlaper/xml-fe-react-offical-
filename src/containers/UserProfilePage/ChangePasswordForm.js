import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { changePasswordSchema } from './validations';

export default function ChangePasswordForm({ onSubmit, isPending }) {
  function handleOnSubmit(values, { setErrors, resetForm }) {
    const { currentPassword, newPassword, newPasswordConfirmation } = values;
    onSubmit(
      currentPassword,
      newPassword,
      newPasswordConfirmation,
      setErrors,
      resetForm
    );
  }

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: ''
      }}
      validationSchema={changePasswordSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="currentPassword">
            current password
          </label>
          <Field type="password" name="currentPassword" required />
          <ErrorMessage name="currentPassword">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="newPassword">
            new password
          </label>
          <Field type="password" name="newPassword" required />
          <ErrorMessage name="newPassword">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="newPasswordConfirmation">
            new password confirmation
          </label>
          <Field type="password" name="newPasswordConfirmation" required />
          <ErrorMessage name="newPasswordConfirmation">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <button disabled={isPending} type="submit">
          Change password
        </button>
      </Form>
    </Formik>
  );
}

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};

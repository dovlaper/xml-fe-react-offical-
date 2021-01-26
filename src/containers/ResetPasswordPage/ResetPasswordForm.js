import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { resetPasswordSchema } from './validations';

export default function ResetPasswordForm({ onSubmit, isPending }) {
  const handleOnSubmit = (values, { setErrors }) => {
    const { password, passwordConfirmation } = values;
    onSubmit(password, passwordConfirmation, setErrors);
  };

  return (
    <Formik
      initialValues={{
        password: '',
        passwordConfirmation: ''
      }}
      validationSchema={resetPasswordSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="password">
            Password
          </label>
          <Field type="password" name="password" required autoFocus />
          <ErrorMessage name="password">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="passwordConfirmation">
            Password confirmation
          </label>
          <Field type="password" name="passwordConfirmation" required />
          <ErrorMessage name="passwordConfirmation">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <button disabled={isPending} type="submit">
          Reset password
        </button>
      </Form>
    </Formik>
  );
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};

import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgotPasswordSchema } from './validations';

function ForgotPasswordForm({ onSubmit, isPending }) {
  const handleOnSubmit = (values, { setErrors }) => {
    const { email } = values;
    onSubmit(email, setErrors);
  };


  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={forgotPasswordSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="email">
            email
          </label>
          <Field type="email" name="email" required autoFocus />
          <ErrorMessage name="email">
            {({defaultMessage}) =>
              defaultMessage
            }
          </ErrorMessage>
        </div>
        <button disabled={isPending} type="submit">
          Reset password
        </button>
      </Form>
    </Formik>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};

export default ForgotPasswordForm;

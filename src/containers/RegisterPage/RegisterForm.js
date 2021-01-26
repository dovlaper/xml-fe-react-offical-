import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from './validations';

export default function RegisterForm({ onSubmit, isPending }) {

  const handleOnSubmit = (values, { setErrors }) => {
    const { firstName, lastName, email, password } = values;
    onSubmit(firstName, lastName, email, password, setErrors);
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }}
      validationSchema={registerSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <div>
          <label htmlFor="firstName">
            First name
          </label>
          <Field type="text" name="firstName" required autoFocus />
          <ErrorMessage name="firstName">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="lastName">
            Last name
          </label>
          <Field type="text" name="lastName" required />
          <ErrorMessage name="lastName">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="email">
            email
          </label>
          <Field type="email" name="email" required />
          <ErrorMessage name="email">
            {({defaultMessage})=> defaultMessage}}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="password">
            password
          </label>
          <Field type="password" name="password" required />
          <ErrorMessage name="password">
            {msg =>msg}
          </ErrorMessage>
        </div>
        <button disabled={isPending} type="submit">
          register
        </button>
      </Form>
    </Formik>
  );
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};

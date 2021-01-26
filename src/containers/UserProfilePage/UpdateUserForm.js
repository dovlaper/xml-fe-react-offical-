import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateUserSchema } from './validations';
import ImageField from './ImageField';

export default function UpdateUserForm({ user, onSubmit, isPending }) {

  function handleOnSubmit(values, { setErrors }) {
    const { firstName, lastName, avatar } = values;
    onSubmit(firstName, lastName, avatar, setErrors);
  }

  return (
    <Formik
      initialValues={{
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        avatar: user.avatar || null
      }}
      validationSchema={updateUserSchema}
      onSubmit={handleOnSubmit}
      enableReinitialize
    >
      {({ setFieldValue }) => (
        <Form>
          <Field
            component={ImageField}
            name="avatar"
            setFieldValue={setFieldValue}
          />
          <div>
            <label htmlFor="firstName">
              First Name
            </label>
            <Field type="text" name="firstName" required autoFocus />
            <ErrorMessage name="firstName">
              {({defaultMessage})=> defaultMessage}}
            </ErrorMessage>
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name
            </label>
            <Field type="text" name="lastName" required />
            <ErrorMessage name="lastName">
              {({defaultMessage})=> defaultMessage}}
            </ErrorMessage>
          </div>
          <button disabled={isPending} type="submit">
            Update
          </button>
        </Form>
      )}
    </Formik>
  );
}

UpdateUserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func,
  isPending: PropTypes.bool
};

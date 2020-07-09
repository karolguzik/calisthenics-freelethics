import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import AuthTemplate from '../templates/AuthTemplate';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { login } from '../actions/auth';

const StyledButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
`;

const StyledInput = styled(Input)`
  margin: 1rem 0;
  padding: 0.9rem;
  border: ${(props) => props.border || 'none'};
`;

const TextError = styled.p`
  color: ${({ theme }) => theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const LoginPage = ({ login, alert, isAuthenticated, authUser }) => {
  const alertMsg = alert
    ? alert.map((alert) => <TextError>{alert.msg}</TextError>)
    : null;

  if(isAuthenticated) {
    return <Redirect to="/trainings" />
  }

  return (
    <AuthTemplate
      title='sign in'
      linkPath='/registration'
      linkText='Ï want to register account!'
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          let errors = {};

          if (!values.email) {
            errors.email = 'email is required';
          } else if (values.email.length < 5) {
            errors.email = 'Invalid email';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 5) {
            errors.password = 'Password must not be shorter then 5 letters';
          }

          return errors;
        }}
        onSubmit={({email, password}) => {
          login(email, password);
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            {touched.email && errors.email && (
              <TextError>{errors.email}</TextError>
            )}
            {alertMsg}
            <StyledInput
              type='email'
              name='email'
              placeholder='email'
              border={touched.email && errors.email && '1px solid red'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete='off'
            />
            {touched.password && errors.password && (
              <TextError>{errors.password}</TextError>
            )}
            <StyledInput
              type='password'
              name='password'
              placeholder='password'
              border={touched.password && errors.password && '1px solid red'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <StyledButtonContainer>
              <Button type='submit' secondary>
                Login
              </Button>
            </StyledButtonContainer>
          </Form>
        )}
      />
    </AuthTemplate>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginPage);

import React from 'react';
import styled from 'styled-components';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import AuthTemplate from '../templates/AuthTemplate';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { register } from '../actions/auth';


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

const LoadingInitializeAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: White;
  font-weight: 2rem;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  z-index: 10000;
`;

const RegistrationPage = ({ register, alert, initializeAccount, isAuthenticated, history }) => {
  const onSubmit = (username, email, password) => {
    register(username, email, password, history);
  };

  const alertMsg = alert
    ? alert.map((alert) => <TextError>{alert.msg}</TextError>)
    : null;

  if(isAuthenticated) {
    return <Redirect to='/trainings' />
  }

  if (initializeAccount) {
    return (
      <LoadingInitializeAccount>
        Initialized account...
      </LoadingInitializeAccount>
    );
  }

  return (
    <AuthTemplate
      title='sign up'
      linkPath='/login'
      linkText='I want to log in!'
    >
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validate={(values) => {
          let errors = {};

          // let regex = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

          // if (!values.email) {
          //   errors.email = 'Email is required';
          // } else if (regex.test(values.email)) {
          //   errors.email = 'Invalid email address';
          // }

          if (!values.username) {
            errors.username = 'username is required';
          } else if (values.username.length < 5) {
            errors.username = 'username must not be shorter then 5 letters';
          }

          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 5) {
            errors.password = 'Password must not be shorter then 5 letters';
          }

          return errors;
        }}
        onSubmit={({ email, username, password }) => {
          onSubmit(email, username, password);
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete='off'>
            {touched.email && errors.email && (
              <TextError>{errors.email}</TextError>
            )}
            {alertMsg}
            <StyledInput
              type='text'
              name='email'
              placeholder='email'
              border={touched.email && errors.email && '1px solid red'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete='off'
            />
            {touched.username && errors.username && (
              <TextError>{errors.username}</TextError>
            )}
            <StyledInput
              type='text'
              name='username'
              placeholder='username'
              border={touched.username && errors.username && '1px solid red'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
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
                Register
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
  initializeAccount: state.auth.initializeAccount,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(withRouter(RegistrationPage));

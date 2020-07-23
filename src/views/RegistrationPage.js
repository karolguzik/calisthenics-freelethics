import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import AuthTemplate from '../templates/AuthTemplate';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import RangeProgress from '../components/RangeProgress/RangeProgress';
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.bgcDarkSecondary};
  z-index: 10000;
`;

const StyledInitializeText = styled.p`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledConfirmText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colorExtraQuatenary};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const RegistrationPage = ({ history }) => {
  const alert = useSelector((state) => state.alert);
  const initializeAccount = useSelector(
    (state) => state.auth.initializeAccount
  );
  const initializeConfirm = useSelector(
    (state) => state.auth.initializeConfirm
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onSubmit = (username, email, password) => {
    dispatch(register(username, email, password, history));
  };

  const alertMsg = alert
    ? alert.map((alert) => <TextError>{alert.msg}</TextError>)
    : null;

  if (isAuthenticated) {
    return <Redirect to='/trainings' />;
  }

  if (initializeAccount) {
    return (
      <LoadingInitializeAccount>
        <RangeProgress />
        {initializeConfirm ? (
          <StyledConfirmText>Account registered!</StyledConfirmText>
        ) : (
          <StyledInitializeText>Creating account...</StyledInitializeText>
        )}
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
          let regex = /\S+@\S+\.\S+/;

          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!regex.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          if (!values.username) {
            errors.username = 'Username is required';
          } else if (values.username.length < 5) {
            errors.username = 'Username must not be shorter then 5 letters';
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
          <Form onSubmit={handleSubmit} noValidate>
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
              autoComplete='none'
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
              autoComplete='none'
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

RegistrationPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(RegistrationPage);

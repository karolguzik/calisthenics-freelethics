import React from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import AuthTemplate from '../templates/AuthTemplate';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

const StyledButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
`;

const StyledInput = styled(Input)`
  margin: 1rem 0;
  padding: 1rem;
  border: ${(props) => props.border || 'none'};
`;

const TextError = styled.p`
  color: ${({theme}) => theme.colorExtraSecondary};
  font-size: ${({theme}) => theme.fontSize.xxs};
`;

const LoginPage = () => (
  <AuthTemplate
    title='sign in'
    linkPath='/registration'
    linkText='Ï want to register account!'
  >
    <Formik
      initialValues={{ login: '', password: '' }}
      validate={values => {
        let errors = {};

        if(!values.login) {
          errors.login = "Login is required"
        } else if (values.login.length < 5) {
          errors.login = "Login must not be shorter then 5 letters";
        }

        if(!values.password) {
          errors.password = "Password is required"
        } else if (values.password.length < 5) {
          errors.password = "Password must not be shorter then 5 letters"
        }

        return errors;
      }}
      onSubmit={(values) => {
        console.log(values);
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
            {touched.login && errors.login && <TextError>{errors.login}</TextError>}
            <StyledInput
              type='text'
              name='login'
              placeholder='login'
              border={touched.login && errors.login && '1px solid red'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.login}
            />
            {touched.password && errors.password && <TextError>{errors.password}</TextError>}
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

export default LoginPage;

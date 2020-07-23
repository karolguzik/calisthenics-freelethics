import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header/Header';

const WelcomePage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if(isAuthenticated) {
    return <Redirect to='/trainings' />
  }
  
  return(
    <Header />
  )
}

export default WelcomePage;
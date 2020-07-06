import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';

const WelcomePage = ({ isAuthenticated }) => {
  if(isAuthenticated) {
    return <Redirect to='/trainings' />
  }
  
  return(
    <Header />
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(WelcomePage);
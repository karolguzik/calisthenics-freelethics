import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StyledAlert = styled.p`
  color: ${({ theme }) => theme.colorExtraSecondary};
  margin: .5rem;
`;

const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => <StyledAlert key={alert.id}>{alert.msg}</StyledAlert>);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
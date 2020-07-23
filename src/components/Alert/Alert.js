import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../../mediaQueries/mediaQueries';
import { connect } from 'react-redux';

const StyledAlert = styled.p`
  color: ${({ theme, type }) => type === 'failure' ? theme.colorExtraSecondary : theme.colorExtraTertiary};
  margin: ${({type}) => type === 'failure' ? '.5rem' : '0 0 2rem'};
  text-align: ${({type}) => type !== 'failure' && 'center'};

  @media ${device.laptopL} {
    text-align:center;
  }
`;

const Alert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => <StyledAlert key={alert.alertId} type={alert.alertType}>{alert.msg}</StyledAlert>);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
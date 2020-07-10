import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import CardTraining from '../components/CardTraining/CardTraining';
import Alert from '../components/Alert/Alert';
import { getTrainings } from '../actions/training';

const StyledParagraph = styled.p`
  color: ${({theme}) => theme.fontColorGray};
  font-size: ${({theme}) => theme.fontSize.m};
  text-align:center;
  margin-top: 3rem;
`;

const MyTrainingsPage = ({ myTrainings: { myTrainings }, getTrainings }) => {
  useEffect(() => {
    getTrainings();
  }, []);

  const renderTrainings =
    myTrainings.length > 0 &&
    myTrainings.map((training) => (
      <CardTraining key={training._id} {...training} />
    ));

  return (
    <UserPanelTemplate activeTopNav>
    <>
      <Alert />
      {myTrainings.length > 0 ? (
        <GridTemplate>{renderTrainings}</GridTemplate>
      ) : (
        <StyledParagraph>Create your training</StyledParagraph>
      )}
    </>
    </UserPanelTemplate>
  );
};

MyTrainingsPage.propTypes = {
  myTrainings: PropTypes.object.isRequired,
  getTrainings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  myTrainings: state.training,
});

export default connect(mapStateToProps, { getTrainings })(MyTrainingsPage);

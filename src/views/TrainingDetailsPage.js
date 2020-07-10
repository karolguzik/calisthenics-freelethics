import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import Button from '../components/Button/Button';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import { connect } from 'react-redux';
import { getTraining, deleteTraining } from '../actions/training';

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  margin-top: 2rem;
  grid-template-columns: 90%;

  @media ${device.tablet} {
    grid-auto-rows: auto;
    grid-template-columns: 70%;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 25%);
    justify-content: center;
    grid-gap: 2rem;
  }
`;

const StyledInnerWrapper = styled.div`
  width: 90%;
  margin: 0 auto 2rem;

  & > * {
    margin: 1rem 0;
  }

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 70%;
  }

  @media ${device.laptopL} {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const StyledButtonWrapper = styled.div`
  @media ${device.laptopL} {
    align-self: flex-start;
    flex-basis: 100%;
    text-align: center;
  }
`;

const StyledButton = styled(Button)`
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const StyledHr = styled.hr`
  border: 1px solid ${({ theme }) => theme.bgcDarkSecondary};
`;

const TrainingDetailsPage = ({
  getTraining,
  deleteTraining,
  activeTraining,
  match,
  history
}) => {
  const id = match.params.id;

  useEffect(() => {
    getTraining(id);
  }, []);

  console.log(id);

  if (activeTraining) {
    const { name, totalTime, exercises, exerciseRestTime, reps, repsRestTime } = activeTraining;

    const renderExercises =
      exercises !== null &&
      exercises.length > 0 &&
      exercises.map(({ exerciseId, exerciseName, exerciseTime }) => (
        <p key={exerciseId}>
          {exerciseName} - {exerciseTime} seconds
        </p>
      ));

    return (
      <UserPanelTemplate pageTitle={name}>
        <>
          <StyledInnerWrapper>
            <SummaryTraining totalTime={totalTime} reps={reps} exercises={exercises.length} repsRestTime={repsRestTime} exerciseRestTime={exerciseRestTime} />
            <StyledButtonWrapper>
              <StyledButton as={Link} to={`/app/${id}`} quatenary>Start in app</StyledButton>
              <StyledButton tertiary onClick={() => deleteTraining(id, history)}>Delete</StyledButton>
            </StyledButtonWrapper>
          </StyledInnerWrapper>
          <StyledHr></StyledHr>
          <StyledGridTemplate>{renderExercises}</StyledGridTemplate>
        </>
      </UserPanelTemplate>
    );
  } return null;
};

TrainingDetailsPage.propTypes = {
  getTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  activeTraining: PropTypes.object,
};

const mapStateToProps = (state) => ({
  activeTraining: state.training.activeTraining,
});

export default connect(mapStateToProps, { getTraining, deleteTraining })(
  TrainingDetailsPage
);

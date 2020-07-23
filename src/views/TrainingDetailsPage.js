import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import Button from '../components/Button/Button';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import { getTraining, deleteTraining } from '../actions/training';

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  grid-template-columns: 90%;
  animation: slideIn 0.3s ease-in-out;

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
  margin: 2rem auto;
  animation: slideIn 0.3s ease-in-out;

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

const StyledExercise = styled.div`
  p:nth-child(2) {
    color: ${({theme}) => theme.fontColorGray};
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
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
  background: none;
  color: ${({ theme }) => theme.colorExtraQuatenary};
  border: 1px solid ${({ theme }) => theme.colorExtraQuatenary};
  border-radius: 15px;

  @media ${device.tablet} {
    border-radius: 30px;
  }

  @media ${device.laptop} {
    border-radius: 50px;
  }

  :hover {
    color: ${({ theme }) => theme.fontColorDark};
    background: ${({ theme }) => theme.colorExtraQuatenary};
  }

  :nth-child(2) {
    color: ${({ theme }) => theme.colorExtraSecondary};
    border: 1px solid ${({ theme }) => theme.colorExtraSecondary};

    :hover {
      color: ${({ theme }) => theme.fontColorDark};
      background: ${({ theme }) => theme.colorExtraSecondary};
    }
  }
`;

const StyledHr = styled.hr`
  border: 1px solid ${({ theme }) => theme.bgcDarkSecondary};
`;

const TrainingDetailsPage = ({ match, history }) => {
  const id = match.params.id;

  const activeTraining = useSelector((state) => state.training.activeTraining);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTraining(id));
  }, [id, dispatch]);

  const [deleteTrainingStep, setDeleteTrainingStep] = useState(false);

  const handleDeleteTraining = () => {
    setDeleteTrainingStep(true);
  };

  if (activeTraining) {
    const {
      name,
      totalTime,
      exercises,
      exerciseRestTime,
      reps,
      repsRestTime,
    } = activeTraining;

    const renderExercises =
      exercises !== null &&
      exercises.length > 0 &&
      exercises.map(({ exerciseId, exerciseName, exerciseTime }) => (
        <StyledExercise key={exerciseId}>
          <p>{exerciseName}</p>
          <p>{exerciseTime} seconds</p>
        </StyledExercise>
      ));

    let isActiveTrainingDone = false;

    if (activeTraining.status !== undefined) {
      isActiveTrainingDone = true;
    }

    return (
      <UserPanelTemplate pageTitle={name}>
        <>
          <StyledInnerWrapper>
            <SummaryTraining
              totalTime={totalTime}
              reps={reps}
              exercises={exercises.length}
              repsRestTime={repsRestTime}
              exerciseRestTime={exerciseRestTime}
            />
            <StyledButtonWrapper>
              {deleteTrainingStep ? (
                <>
                  <StyledButton as={Link} to={`/app/${id}`}>
                    Start app
                  </StyledButton>
                  <StyledButton
                    tertiary
                    onClick={() => dispatch(deleteTraining(id, history))}
                  >
                    are u sure?
                  </StyledButton>
                </>
              ) : (
                <>
                  <StyledButton as={Link} to={`/app/${id}`}>
                    Start app
                  </StyledButton>
                  {!isActiveTrainingDone && (
                    <StyledButton tertiary onClick={handleDeleteTraining}>
                      Delete
                    </StyledButton>
                  )}
                </>
              )}
            </StyledButtonWrapper>
          </StyledInnerWrapper>
          <StyledHr></StyledHr>
          <StyledGridTemplate>{renderExercises}</StyledGridTemplate>
        </>
      </UserPanelTemplate>
    );
  }
  return null;
};

TrainingDetailsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default TrainingDetailsPage;

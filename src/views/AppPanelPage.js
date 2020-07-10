import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getTraining } from '../actions/training';

const StyledWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${device.laptopL} {
    width: 70%;
  }
`;

const StyledActiveExerciseTitle = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 10px;

  @media ${device.mobileS} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.l};
    margin-top: 5rem;
  }
`;

const StyledTimeWrapper = styled.div`
  margin-top: 2rem;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 10px;

  @media ${device.tablet} {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
`;

const StyledNextExerciseTitle = styled.p`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colorExtraTertiary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: right;
`;

const StyledSummaryTrainingWrapper = styled.div`
  margin: 7rem 0 0 auto;

  @media ${device.mobileS} {
    margin: 12rem 0 0 auto;
  }

  @media ${device.mobileL} {
    margin: 20rem 0 0 auto;
  }

  @media ${device.tablet} {
    margin: 6rem 0 0 auto;
  }

  @media ${device.laptopL} {
    margin-top: 10rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  @media ${device.desktop} {
    margin: 10rem 0 0 auto;
  }
`;

const StyledSummaryTrainingTitle = styled.h3`
  flex-basis: 100%;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const StyledDoneTrainingMessage = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
`;

const AppPanelPage = ({ match }) => {
  const id = match.params.id;

  const activeTraining = useSelector((state) => state.training.activeTraining);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTraining(id));
  }, [id]);

  const [trainingData, setTrainingData] = useState({
    activeExerciseName: '',
    activeExerciseTime: '',
    nextExerciseName: '',
    nextExerciseTime: '',
  });

  const {
    activeExerciseName,
    activeExerciseTime,
    nextExerciseName,
    nextExerciseTime,
  } = trainingData;

  if (!activeTraining) {
    return null;
  }

  const {
    name,
    totalTime,
    reps,
    exercises,
    repsRestTime,
    exerciseRestTime,
  } = activeTraining;

  const startTraining = () => {
    let repsLength = parseInt(reps);
    let exercisesLength = exercises.length;
    let i = 0;
    let j = 0;
    let idInterval;

    while (i < repsLength) {
      while (j < exercisesLength) {
        let exerciseTime = exercises[j].exerciseTime;

        setTrainingData({
          activeExerciseName: exercises[j].exerciseName,
          activeExerciseTime: exercises[j].exerciseTime,
          nextExerciseName: exercises[j].exerciseName,
          nextExerciseTime: exercises[j].exerciseTime,
        });
        
        exerciseTime = exerciseTime - 1;
        while(exerciseTime > 0){
          idInterval = setInterval(() => {
            setTrainingData({
              ...trainingData,
              activeExerciseTime: exerciseTime,
            });
          }, 1000);
        } 

        clearInterval(idInterval);
        j++;
      }
      i++;
    }
  };

  return (
    <UserPanelTemplate
      pageTitle={name}
      activeAppPanelNav
      startTraining={() => startTraining()}
    >
      <StyledWrapper>
        <StyledActiveExerciseTitle>
          {activeExerciseName}
        </StyledActiveExerciseTitle>
        <StyledTimeWrapper>{activeExerciseTime}</StyledTimeWrapper>
        <StyledNextExerciseTitle>
          Next: {nextExerciseName} - {nextExerciseTime}
        </StyledNextExerciseTitle>
        <StyledSummaryTrainingWrapper>
          <StyledSummaryTrainingTitle>Left :</StyledSummaryTrainingTitle>
          <SummaryTraining
            totalTime={totalTime}
            reps={reps}
            exercises={exercises.length}
            repsRestTime={repsRestTime}
            exerciseRestTime={exerciseRestTime}
          />
        </StyledSummaryTrainingWrapper>
      </StyledWrapper>
    </UserPanelTemplate>
  );
};

export default AppPanelPage;

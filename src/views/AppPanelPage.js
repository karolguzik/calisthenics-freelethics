import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import Button from '../components/Button/Button';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import MuscleIcon from '../assets/icons/muscle.png';
import RangeIcon from '../assets/images/calisthenics-range.png';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getTraining, doneTraining } from '../actions/training';


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
  margin: 5rem 0;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 10px;

  @media ${device.tablet} {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }

  i {
    font-size: 8rem;
    color: ${({ theme }) => theme.colorExtraSecondary};
    opacity: 0.6;
    transition: 0.3s ease-in-out;

    :hover {
      opacity: 0.8;
      transform: scale(1.05);
      cursor: pointer;
    }
  }
`;

const StyledNextExerciseTitle = styled.p`
  margin-top: 2rem;
  color: ${({ theme }) => theme.fontColorLight};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  text-align: center;

  p {
    margin: 1rem;
    color: ${({ theme }) => theme.colorExtraQuatenary};
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: black;
  background: ${({theme}) => theme.bgcDarkSecondary};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;

  h2 {
    font-size: 3.5rem;
  }

  p {
    color: ${({ theme }) => theme.fontColorGray};
    margin: 1rem 0;
  }
`;

// const StyledIconBiceps = styled.div`
//   margin: 2rem 0;
//   width: 70px;
//   height: 70px;
//   background-image: url(${() => MuscleIcon});
//   background-repeat: no-repeat;
//   background-size: 100%;
// `;

const StyledRangeIcon = styled.div`
  position:relative;
  margin: 2rem 0;
  width: 212px;
  height: 80px;
  background-image: url(${() => RangeIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  /* background-position:cover; */
  overflow: hidden;
`;

const StyledRangeInnerBgc = styled.div`
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: ${({theme}) => theme.fontColorGray};
  z-index: -1;
`;

const StyledRangeCoverBgc = styled.div`
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: ${({theme}) => theme.colorExtraQuatenary};
  transform: translateY(100%);
  animation: loadingRegisterIcon 4s ease-in-out forwards;
  z-index: -1;
`;

const StyledButton = styled(Button)`
  display: inline-block;
`;

const AppPanelPage = ({ match }) => {
  const id = match.params.id;

  const activeTraining = useSelector((state) => state.training.activeTraining);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTraining(id));
  }, [id]);

  const [trainingData, setTrainingData] = useState({
    activeExerciseName: 'caf',
    activeExerciseTime: '',
    nextExerciseName: '',
    nextExerciseTime: '',
    finishTraining: false,
    startedTraining: false,
    lastExercise: false,
  });

  const {
    activeExerciseName,
    activeExerciseTime,
    nextExerciseName,
    nextExerciseTime,
    finishTraining,
    startedTraining,
    lastExercise,
  } = trainingData;

  if (!activeTraining) {
    return null;
  }

  const {
    name,
    exercises,
  } = activeTraining;
  
  const exerciseIteration = (exerciseIterator, repsIterator) => {
    let idInterval;
    let activeExercise;
    let activeExerciseTime = exercises[exerciseIterator].exerciseTime;
    let exerciseRestTime = activeTraining.exerciseRestTime;
    let repsRestTime = activeTraining.repsRestTime;
    let nextExercise;
    let nextExerciseTime;

    if (exerciseIterator !== exercises.length - 1) {
      activeExercise = exercises[exerciseIterator].exerciseName;
      nextExercise = exercises[exerciseIterator + 1].exerciseName;
      nextExerciseTime = exercises[exerciseIterator + 1].exerciseTime;
    } else {
      activeExercise = exercises[exercises.length - 1].exerciseName;
      nextExercise = exercises[0].exerciseName;
      nextExerciseTime = exercises[0].exerciseTime;
      activeExerciseTime = exercises[exercises.length - 1].exerciseTime;
      exerciseIterator = -1;
      repsIterator++;
    }

    idInterval = setInterval(() => {
      setTrainingData({
        activeExerciseName: activeExercise,
        activeExerciseTime: activeExerciseTime--,
        nextExerciseName: nextExercise,
        nextExerciseTime: nextExerciseTime,
        startedTraining: true,
      });

      if (exerciseIterator === -1 && repsIterator === activeTraining.reps) {
        setTrainingData({
          activeExerciseName: activeExercise,
          activeExerciseTime: activeExerciseTime,
          startedTraining: true,
          lastExercise: true,
        });

        if (activeExerciseTime === -1) {
          clearInterval(idInterval);
          setTrainingData({
            startedTraining: true,
            finishTraining: true,
          });
          dispatch(doneTraining(activeTraining));
        }
      } else if (activeExerciseTime === -1 && exerciseIterator !== -1) {
        clearInterval(idInterval);

        idInterval = setInterval(() => {
          setTrainingData({
            activeExerciseName: 'rest',
            activeExerciseTime: exerciseRestTime--,
            nextExerciseName: nextExercise,
            nextExerciseTime: nextExerciseTime,
            startedTraining: true,
          });

          if (exerciseRestTime === -1) {
            clearInterval(idInterval);
            exerciseIterator++;
            exerciseIteration(exerciseIterator, repsIterator);
          }
        }, 1000);
      } else if (activeExerciseTime === -1 && exerciseIterator === -1) {
        clearInterval(idInterval);

        idInterval = setInterval(() => {
          setTrainingData({
            activeExerciseName: 'rest',
            activeExerciseTime: repsRestTime--,
            nextExerciseName: nextExercise,
            nextExerciseTime: nextExerciseTime,
            startedTraining: true,
          });

          if (repsRestTime === -1) {
            clearInterval(idInterval);
            exerciseIterator++;
            exerciseIteration(exerciseIterator, repsIterator);
          }
        }, 1000);
      }
    }, 1000);
    console.log(`exerciseIterator: ${exerciseIterator}
        exercisesLength: ${exercises.length}
        repsIterator: ${repsIterator}
      `);
  };

  const startTraining = () => {
    let repsIterator = 0;
    let exerciseIterator = 0;
    exerciseIteration(exerciseIterator, repsIterator);
  };

  console.log(trainingData);

  if (finishTraining) {
    return (
      <StyledDoneTrainingMessage>
        <h2>Training done!</h2>
        {/* <StyledIconBiceps /> */}
        <StyledRangeIcon>
          <StyledRangeInnerBgc />
          <StyledRangeCoverBgc />
        </StyledRangeIcon>
        <p>Training will be save in your progress.</p>
        <div>
          <StyledButton as={Link} to='/progress' quatenary>
            Check
          </StyledButton>
          <StyledButton as={Link} to='/trainings' tertiary>
            Go back
          </StyledButton>
        </div>
      </StyledDoneTrainingMessage>
    );
  } else {
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
          <StyledTimeWrapper>
            {startedTraining ? (
              activeExerciseTime
            ) : (
              <i
                onClick={() => startTraining()}
                className='fa fa-play'
                aria-hidden='true'
              ></i>
            )}
          </StyledTimeWrapper>
          {startedTraining && !lastExercise && (
            <StyledNextExerciseTitle>
              <h2>Next:</h2>
              <p>
                {nextExerciseName} - {nextExerciseTime} seconds
              </p>
            </StyledNextExerciseTitle>
          )}
          {/* <StyledSummaryTrainingWrapper> */}
          {/* <StyledSummaryTrainingTitle>Left :</StyledSummaryTrainingTitle> */}
          {/* <SummaryTraining
              totalTime={totalTime}
              reps={reps}
              exercises={exercises.length}
              repsRestTime={repsRestTime}
              exerciseRestTime={exerciseRestTime}
            /> */}
          {/* </StyledSummaryTrainingWrapper> */}
        </StyledWrapper>
      </UserPanelTemplate>
    );
  }
};

export default AppPanelPage;

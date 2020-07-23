import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import Button from '../components/Button/Button';
import RangeProgress from '../components/RangeProgress/RangeProgress';
import { useSelector, useDispatch } from 'react-redux';
import { getTraining } from '../actions/training';
import { doneTraining } from '../actions/progress';

const StyledWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-in-out;

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

const StyledNextExerciseTitle = styled.div`
  margin-top: 2rem;
  color: ${({ theme }) => theme.fontColorLight};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: center;

  p {
    margin: 1rem;
    color: ${({ theme }) => theme.colorExtraQuatenary};
  }

  span {
    color: ${({ theme }) => theme.fontColorGray};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }
`;

const StyledDoneTrainingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: black;
  background: ${({ theme }) => theme.bgcDarkSecondary};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  animation: slideIn 0.3s ease-in-out;

  h2 {
    font-size: 3.5rem;
  }

  p {
    color: ${({ theme }) => theme.fontColorGray};
    margin: 1rem 0;
  }
`;

const StyledRangePoints = styled.div`
  margin-bottom: 2rem;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colorExtraQuatenary};
`;

const StyledButton = styled(Button)`
  display: inline-block;

  :nth-child(1) {
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
  }

  :nth-child(2) {
    background: none;
    color: ${({ theme }) => theme.colorExtraSecondary};
    border: 1px solid ${({ theme }) => theme.colorExtraSecondary};
    border-radius: 15px;

    @media ${device.tablet} {
      border-radius: 30px;
    }

    @media ${device.laptop} {
      border-radius: 50px;
    }

    :hover {
      color: ${({ theme }) => theme.fontColorDark};
      background: ${({ theme }) => theme.colorExtraSecondary};
    }
  }
`;

const AppPanelPage = ({ match }) => {
  const id = match.params.id;

  const activeTraining = useSelector((state) => state.training.activeTraining);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTraining(id));
  }, [dispatch, id]);

  const [counterPoints, setCounterPoints] = useState({ points: 0 });
  let counter = 0;

  const countRangePoints = () => {
    const pointsTarget = parseInt(activeTraining.totalTime / 60);
    let speed = 4000 / pointsTarget;
    let inc = 1;

    if (counter < pointsTarget) {
      setCounterPoints({ points: counter });
      counter += inc;
      setTimeout(countRangePoints, speed);
    } else {
      setCounterPoints({ points: pointsTarget });
    }
  };

  const [isAppStarted, setIsAppStarted] = useState(false);

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

  const { name, exercises } = activeTraining;

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
          countRangePoints();
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
  };

  const startTraining = () => {
    setIsAppStarted(true);
    let repsIterator = 0;
    let exerciseIterator = 0;
    exerciseIteration(exerciseIterator, repsIterator);
  };

  const stopTraining = () => {
    isAppStarted && window.location.reload(false);
  };

  if (finishTraining) {
    return (
      <StyledDoneTrainingMessage>
        <h2>Training done!</h2>
        <RangeProgress />
        <StyledRangePoints>
          CaF points +{counterPoints.points}
        </StyledRangePoints>
        <p>Training will be saved in your progress.</p>
        <div>
          <StyledButton as={Link} to='/progress'>
            Check
          </StyledButton>
          <StyledButton as={Link} to='/trainings'>
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
        stopTraining={stopTraining}
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
                {nextExerciseName} <span> - {nextExerciseTime} seconds</span>
              </p>
            </StyledNextExerciseTitle>
          )}
        </StyledWrapper>
      </UserPanelTemplate>
    );
  }
};

AppPanelPage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default AppPanelPage;

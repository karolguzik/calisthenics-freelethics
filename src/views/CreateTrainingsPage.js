import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import Alert from '../components/Alert/Alert';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { createTraining } from '../actions/training';

const StyledWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  animation: slideIn 0.3s ease-in-out;

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 70%;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;

  @media ${device.laptopL} {
    width: 60%;
    margin: 0 auto;
    text-align: center;
  }
`;

const StyledInput = styled(Input)`
  margin: 1rem 0;
  color: ${({ theme }) => theme.fontColorLight};
  background: ${({ theme }) => theme.bgcDarkSecondary};
  border: 1px solid ${({ theme }) => theme.bgcDarkTertiary};
  border-radius: 20px;

  @media ${device.tablet} {
    padding: 0.8rem;
    border-radius: 30px;
  }

  @media ${device.laptopL} {
    padding: 0.6rem;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const StyledButton = styled(Button)`
  margin: 1rem;

  ${({ big }) =>
    big &&
    css`
      width: 80%;

      :hover {
        transform: scale(1);
        box-shadow: none;
      }
    `}
`;

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  grid-template-columns: 100%;
  margin-bottom: 2rem;

  @media ${device.mobileL} {
    grid-template-columns: 100%;
  }

  @media ${device.tablet} {
    grid-auto-rows: auto;
  }

  @media ${device.laptopL} {
    grid-template-columns: 60%;
    justify-content: center;
    grid-gap: 2rem;
  }
`;

const StyledExercise = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  animation: slideIn 0.3s ease-in-out;

  span {
    color: ${({theme}) => theme.fontColorGray};
    font-size: ${({theme}) => theme.fontSize.xs};
  }

  p {
    display: flex;
    flex-direction: column;
  }

  i:hover {
    transition: 0.2s;
    color: ${({ theme }) => theme.colorExtraSecondary};
    cursor: pointer;
  }
`;

const StyledSummaryWrapper = styled.div`
  margin: 3rem 0;

  @media ${device.laptopL} {
    display: flex;
    justify-content: space-between;
  }

  & > * {
    margin: 1rem 0;
  }
`;

const StyledHr = styled.hr`
  border: 1px solid ${({ theme }) => theme.bgcDarkSecondary};
`;

const TextError = styled.p`
  color: ${({ theme }) => theme.colorExtraSecondary};
  margin: 0.5rem;
  text-align: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  color: ${({ theme }) => theme.fontColorGray};
  background: ${({ theme }) => theme.bgcDarkSecondary};
  border: 1px solid ${({ theme }) => theme.bgcDarkTertiary};
  border-radius: 20px;

  optgroup {
    color: ${({ theme }) => theme.colorExtraSecondary};
  }

  option {
    color: ${({ theme }) => theme.fontColorGray};
  }

  @media ${device.tablet} {
    padding: 0.8rem;
    font-size: ${({ theme }) => theme.fontSize.xs};
    border-radius: 30px;
  }

  @media ${device.laptop} {
    padding: 1.2rem;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }

  @media ${device.laptopL} {
    padding: 0.6rem;
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const CreateTrainingsPage = ({ history }) => {
  const dispatch = useDispatch();

  const [training, setTraining] = useState({
    name: '',
    reps: '',
    repsRestTime: '',
    exerciseRestTime: '',
    exercises: [],
    totalTime: 0,
  });

  const [exercise, setExercise] = useState({
    exerciseName: '',
    exerciseTime: '',
    exerciseId: uuidv4(),
  });

  const [exerciseValidationError, setExerciseValidationError] = useState({
    textError: '',
  });

  const {
    name,
    reps,
    repsRestTime,
    exerciseRestTime,
    exercises,
    totalTime,
  } = training;

  const { exerciseName, exerciseTime } = exercise;

  const { textError } = exerciseValidationError;

  const exercisesTotalTime =
    exercises.length > 0
      ? exercises
          .map((el) => parseInt(el.exerciseTime))
          .reduce((el1, el2) => el1 + el2, 0)
      : 0;

  const handleInputKeydown = (e) => {
    const invalidChars = ['-', '+', 'e'];

    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleOnMouseWheel = (e) => {
    e.target.blur();
  };

  const handleInputChange = (e) => {
    if (e.target.type === 'number' && e.target.value === '0') {
      setExerciseValidationError({
        textError: 'You cannot add training with 0 time or reps',
      });

      setTimeout(() => {
        setExerciseValidationError({ textError: '' });
      }, 3000);
      e.target.value = '';
    }

    if (e.target.value === ' ') {
      e.target.value = '';
    }

    if (e.target.name === 'exerciseName' || e.target.name === 'exerciseTime') {
      setExercise({ ...exercise, [e.target.name]: e.target.value });
    } else if (e.target.name === 'reps') {
      setTraining({
        ...training,
        [e.target.name]: e.target.value,
        totalTime: exercisesTotalTime * e.target.value,
      });
    } else {
      setTraining({ ...training, [e.target.name]: e.target.value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(createTraining(training, history));
  };

  const addExercise = (e) => {
    e.preventDefault();

    if (!exerciseName || !exerciseTime) {
      setExerciseValidationError({
        textError: 'Exercise name and time are empty',
      });
      setTimeout(() => {
        setExerciseValidationError({ textError: '' });
      }, 3000);
    } else {
      setTraining({
        ...training,
        exercises: [...exercises, exercise],
        totalTime: totalTime + parseInt(exerciseTime) * parseInt(reps),
      });
      setExercise({ exerciseName: '', exerciseTime: '', exerciseId: uuidv4() });
    }
  };

  const calcTotalTime = (exercisesList) => {
    const newExercisesTime =
      exercisesList.length > 0
        ? exercisesList
            .map((exercise) => parseInt(exercise.exerciseTime))
            .reduce((a, b) => a + b)
        : 0;

    const newTotalTime = parseInt(newExercisesTime) * parseInt(reps);

    return newTotalTime;
  };

  const removeExercise = (e) => {
    const targetExercise = e.target.parentNode;

    const newExercises = exercises.filter(
      (exercise) => exercise.exerciseId !== targetExercise.id
    );

    setTraining({
      ...training,
      exercises: [...newExercises],
      totalTime: calcTotalTime(newExercises),
    });
  };

  const clearTraining = (e) => {
    e.preventDefault();
    setTraining({
      name: '',
      reps: '',
      repsRestTime: '',
      exerciseRestTime: '',
      exercises: [],
      totalTime: 0,
    });

    setExercise({ exerciseName: '', exerciseTime: '', exerciseId: uuidv4() });
  };

  return (
    <UserPanelTemplate pageTitle='create your training'>
      <StyledWrapper>
        <Alert />
        <TextError>{textError}</TextError>
        <StyledForm onSubmit={(e) => handleOnSubmit(e)} autoComplete='off'>
          <StyledInput
            type='text'
            name='name'
            placeholder='training name'
            onChange={handleInputChange}
            value={name}
          />
          <StyledInput
            type='number'
            name='reps'
            placeholder='reps number'
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
            onWheel={handleOnMouseWheel}
            value={reps}
          />
          <StyledInput
            type='number'
            name='repsRestTime'
            placeholder='reps rest time'
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
            onWheel={handleOnMouseWheel}
            value={repsRestTime}
          />
          <StyledInput
            type='number'
            name='exerciseRestTime'
            placeholder='exercise rest time'
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
            onWheel={handleOnMouseWheel}
            value={exerciseRestTime}
          />
          <StyledSelect
            name='exerciseName'
            placeholder='exercise name'
            onChange={handleInputChange}
            value={exerciseName}
          >
            <option value='' disabled hidden>
              exercise name
            </option>
            <optgroup label='Chest'>
              <option>push-up's</option>
              <option>incline push-up's</option>
              <option>decline push-up's</option>
              <option>diamond push-up's</option>
              <option>wide-hands push-up's</option>
              <option>chest dips</option>
            </optgroup>
            <optgroup label='Back'>
              <option>pull-up's</option>
              <option>close-hands pull-up's</option>
              <option>wide-hands pull-up's</option>
              <option>chin-up's</option>
              <option>inverted rows</option>
            </optgroup>
            <optgroup label='Shoulder'>
              <option>pike push-up's</option>
              <option>hand-stand push-up's</option>
              <option>hand-stand holds</option>
              <option>div bomber push-up's</option>
              <option>dips</option>
              <option>plank</option>
              <option>move side plank</option>
            </optgroup>
            <optgroup label='Arm'>
              <option>dips</option>
              <option>dip holds</option>
              <option>inverted rows</option>
              <option>close grip chin up</option>
              <option>hold chin up</option>
              <option>bench dip</option>
            </optgroup>
            <optgroup label='Abs'>
              <option>plank</option>
              <option>side plank</option>
              <option>hanging knee raises</option>
              <option>hanging leg raises</option>
              <option>front levers</option>
              <option>bicycles</option>
              <option>flutter kick's</option>
              <option>full front lever</option>
              <option>dragon flags</option>
              <option>hanging windshield wiper</option>
              <option>leg hold</option>
              <option>l-sit</option>
            </optgroup>
            <optgroup label='Leg'>
              <option>squats</option>
              <option>pistol squats</option>
              <option>squats jumps</option>
              <option>lunges</option>
              <option>box jumps</option>
              <option>calf raises</option>
              <option>wall sits</option>
            </optgroup>
            <optgroup label='Pro'>
              <option>muscle up's</option>
              <option>hand-stand push-up's</option>
              <option>one handed hand-stand</option>
              <option>one handed push-up's</option>
              <option>clapping push-up's</option>
              <option>planches</option>
              <option>type writer pull-up's</option>
            </optgroup>
            <optgroup label='Extra'>
              <option>burpees</option>
              <option>rompers</option>
              <option>running in place</option>
              <option>touched knee</option>
            </optgroup>
          </StyledSelect>
          <StyledInput
            type='number'
            name='exerciseTime'
            placeholder='exercise time'
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
            onWheel={handleOnMouseWheel}
            value={exerciseTime}
          />
          <StyledButton onClick={addExercise} quatenary>
            Add
          </StyledButton>
          <StyledButton onClick={clearTraining} tertiary>
            Clear
          </StyledButton>
          <StyledButton type='submit' big secondary>
            create
          </StyledButton>
        </StyledForm>
        <StyledGridTemplate>
          {exercises.length > 0 &&
            exercises.map((exercise) => (
              <StyledExercise
                key={exercise.exerciseId}
                id={exercise.exerciseId}
              >
                <p>{exercise.exerciseName.toLowerCase()}<span>{exercise.exerciseTime}{' '}
                seconds</span></p>
                <i
                  className='fa fa-times'
                  aria-hidden='true'
                  onClick={(e) => removeExercise(e)}
                ></i>
              </StyledExercise>
            ))}
        </StyledGridTemplate>
        <StyledHr></StyledHr>
        <StyledSummaryWrapper>
          <SummaryTraining
            totalTime={totalTime}
            reps={reps}
            exercises={exercises.length}
            repsRestTime={repsRestTime}
            exerciseRestTime={exerciseRestTime}
          />
        </StyledSummaryWrapper>
      </StyledWrapper>
    </UserPanelTemplate>
  );
};

CreateTrainingsPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default CreateTrainingsPage;

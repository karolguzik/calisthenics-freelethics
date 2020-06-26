import React from 'react';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import Button from '../components/Button/Button';
import {
  StyledTotalTime,
  StyledExercises,
  StyledReps,
  StyledExercisesRest,
  StyledRepsRest
} from '../components/CardTraining/CardTraining';

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  margin-top:2rem;
`;

const StyledInnerWrapper = styled.div`
  width:80%;
  margin:0 auto 2rem;

  & > *{
    margin: 1rem 0;
  }
`;

const StyledButton = styled(Button)`
  margin: .5rem .5rem .5rem 0;
`;

const StyledHr = styled.hr`
  border: 1px solid ${({theme}) => theme.bgcDarkSecondary};
`;


const TrainingDetailsPage = () => (
  <UserPanelTemplate pageTitle='example training'>
    <>
      <StyledInnerWrapper>
        <StyledTotalTime>Total time: 100 minutes</StyledTotalTime>
        <StyledExercises>Exercises: 6x</StyledExercises>
        <StyledReps>Reps: 3x</StyledReps>
        <StyledExercisesRest>Exercise rest: 45 seconds</StyledExercisesRest>
        <StyledRepsRest>Reps rest: 2 minutes</StyledRepsRest>
        <StyledButton quatenary>Start in app</StyledButton>
        <StyledButton tertiary>Delete</StyledButton>
      </StyledInnerWrapper>
      <StyledHr></StyledHr>
      <StyledGridTemplate>
        <p>Push up's - 60 seconds</p>
        <p>Pull up's - 60 seconds</p>
        <p>Burpees - 60 seconds</p>
        <p>Sprawls - 45 seconds</p>
        <p>Jumps - 60 seconds</p>
        <p>Dip's - 60 seconds</p>
        <p>Dip's - 60 seconds</p>
        <p>Dip's - 60 seconds</p>
        <p>Dip's - 60 seconds</p>
        <p>Dip's - 60 seconds</p>
      </StyledGridTemplate>
    </>
  </UserPanelTemplate>
);

export default TrainingDetailsPage;

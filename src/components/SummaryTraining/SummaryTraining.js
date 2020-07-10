import React from 'react';
import styled from 'styled-components';
import { device } from '../../mediaQueries/mediaQueries';


const StyledTotalTime = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const StyledExercises = styled.p`
  color: ${({ theme }) => theme.fontColorLight};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledReps = styled.p`
  color: ${({ theme }) => theme.colorExtraPrimary};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledExercisesRest = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const StyledRepsRest = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.xs};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const SummaryTraining = ({totalTime, reps, exercises, repsRestTime, exerciseRestTime }) => (
  <>
    <StyledTotalTime>Time: {totalTime ? `${totalTime} minutes` : 0}</StyledTotalTime>
    <StyledReps>Reps: {reps ? `${reps}` : 0}</StyledReps>
    <StyledExercises>Exercises: {exercises}</StyledExercises>
    <StyledExercisesRest>Exercise rest: {exerciseRestTime  ? ` ${exerciseRestTime} seconds` : 0}</StyledExercisesRest>
    <StyledRepsRest>Reps rest: {repsRestTime ? `${repsRestTime} seconds` : 0}</StyledRepsRest>
  </>
)

export default SummaryTraining;
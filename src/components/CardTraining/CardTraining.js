import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bgcDarkTertiary};
  padding: 1rem;
  box-shadow: 0 10px 30px -10px #000;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
`;

const StyledViewTraining = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.75);
  transform: skew(10deg) translateX(-110%);
  transition: 0.2s ease-in-out;
  border-right: 1px solid ${({ theme }) => theme.bgcLightTertiary};
  z-index: 10;

  ${StyledWrapper}:hover & {
    transform: skew(10deg) translateX(-50%);
  }

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    color: ${({ theme }) => theme.colorExtraTertiary};
  }
`;

const StyledStartTraining = styled(StyledViewTraining)`
  right: 0;
  justify-content: flex-start;
  transform: skew(10deg) translateX(110%);

  ${StyledWrapper}:hover & {
    transform: skew(10deg) translateX(50%);
  }

  &:hover {
    color: ${({ theme }) => theme.colorExtraSecondary};
  }
`;

const StyledCategoryTag = styled.span`
  position: absolute;
  top: 5%;
  left: 5%;
  padding: 0.1rem;
  color: ${({ theme }) => theme.colorExtraQuatenary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const StyledInnerWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

export const StyledTotalTime = styled.span`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

export const StyledExercises = styled.p`
  color: ${({ theme }) => theme.fontColorLight};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const StyledReps = styled.p`
  color: ${({ theme }) => theme.colorExtraPrimary};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const StyledExercisesRest = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

export const StyledRepsRest = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledTrainingTitle = styled.span`
  color: ${({ theme }) => theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  text-transform: uppercase;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color:${({theme}) => theme.fontColorLight};
`;

export const CardTraining = () => (
  <StyledWrapper>
    <StyledViewTraining as={StyledNavLink} to='/trainings/details/5'>
      Watch
    </StyledViewTraining>
    <StyledStartTraining as={StyledNavLink} to='/app'>
      Start now
    </StyledStartTraining>
    <StyledCategoryTag>Calisthenics</StyledCategoryTag>
    <StyledInnerWrapper>
      <StyledTotalTime>Total time: 120 minutes</StyledTotalTime>
      <StyledExercises>Exercises: x12</StyledExercises>
      <StyledReps>Reps: x4</StyledReps>
      <StyledExercisesRest>Exercise rest: 30 seconds</StyledExercisesRest>
      <StyledRepsRest>Reps rest: 2 minutes</StyledRepsRest>
    </StyledInnerWrapper>
    <StyledTrainingTitle>full body workout</StyledTrainingTitle>
  </StyledWrapper>
);

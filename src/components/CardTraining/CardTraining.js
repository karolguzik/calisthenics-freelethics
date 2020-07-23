import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { device } from '../../mediaQueries/mediaQueries';

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
  animation: slideIn 0.3s ease-in-out;
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
  padding: 0 2rem 0 5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTrainingName = styled.h2`
  text-transform: uppercase;
  font-size: 2.1rem;

  @media ${device.laptopL} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const StyledTrainingExercises = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledTrainingTime = styled.span`
  color: ${({ theme }) => theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  text-transform: uppercase;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColorLight};
`;

const CardTraining = ({ _id, name, exercises, totalTime }) => {
  const formattedTrainingTotalTime = () => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let result = '';

    const formatToMinutes = () => {
      hours = 0;
      minutes = Math.floor(totalTime / 60);
      seconds = totalTime % 60;
    };

    const formatToHours = () => {
      hours = Math.floor(totalTime / 3600);
      minutes = Math.floor((totalTime % 3600) / 60);
      seconds = (totalTime % 3600) % 60;
    };

    if (totalTime >= 60 && totalTime < 3600) {
      formatToMinutes();
      if (seconds === 0) {
        result = `${minutes}m`;
      } else {
        result = `${minutes}m ${seconds}s`;
      }
    } else if (totalTime >= 3600) {
      formatToHours();
      if (minutes === 0 && seconds === 0) {
        result = `${hours}h`;
      } else if (minutes === 0) {
        result = `${hours}h ${seconds}s`;
      } else if (seconds === 0) {
        result = `${hours}h ${minutes}m`;
      } else {
        result = `${hours}h ${minutes}m ${seconds}s`;
      }
    } else {
      seconds = totalTime;
      result = `${seconds}s`;
    }

    return result;
  };

  return (
    <StyledWrapper>
      <StyledViewTraining as={StyledNavLink} to={`/trainings/details/${_id}`}>
        Look at it
      </StyledViewTraining>
      <StyledStartTraining as={StyledNavLink} to={`/app/${_id}`}>
        Start now
      </StyledStartTraining>
      <StyledCategoryTag>CaF</StyledCategoryTag>
      <StyledInnerWrapper>
        <StyledTrainingName>{name}</StyledTrainingName>
        {exercises.length > 1 ? (
          <StyledTrainingExercises>
            {exercises.length} workouts
          </StyledTrainingExercises>
        ) : (
          <StyledTrainingExercises>
            {exercises.length} workout
          </StyledTrainingExercises>
        )}
      </StyledInnerWrapper>
      <StyledTrainingTime>
        Duration: {formattedTrainingTotalTime()}
      </StyledTrainingTime>
    </StyledWrapper>
  );
};

CardTraining.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  totalTime: PropTypes.number.isRequired,
};

export default CardTraining;

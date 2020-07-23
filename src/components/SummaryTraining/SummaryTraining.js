import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../../mediaQueries/mediaQueries';

const StyledWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSize.s};

  div {
    display: flex;
  }

  span {
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.fontColorGray};
    font-weight: ${({ theme }) => theme.fontWeight.light};
  }

  @media ${device.desktop} {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const SummaryTraining = ({
  totalTime,
  reps,
  exercises,
  repsRestTime,
  exerciseRestTime,
}) => {
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
      <div>
        <p>Time:</p>
        <span>{totalTime ? formattedTrainingTotalTime() : 0}</span>
      </div>
      <div>
        <p>Reps:</p>
        <span>{reps ? `${reps}` : 0}</span>
      </div>
      <div>
        <p>Exercises:</p>
        <span>{exercises}</span>
      </div>
      <div>
        <p>Exercise rest:</p>
        <span>{exerciseRestTime ? ` ${exerciseRestTime} seconds` : 0}</span>
      </div>
      <div>
        <p>Reps rest:</p>
        <span>{repsRestTime ? `${repsRestTime} seconds` : 0}</span>
      </div>
    </StyledWrapper>
  );
};

SummaryTraining.propTypes = {
  totalTime: PropTypes.number.isRequired,
  reps: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  exercises: PropTypes.number.isRequired,
  repsRestTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  exerciseRestTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
};

export default SummaryTraining;

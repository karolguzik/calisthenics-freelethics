import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import { connect } from 'react-redux';
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

const AppPanelPage = ({ getTraining, activeTraining, match }) => {
  const id = match.params.id;

  useEffect(() => {
    getTraining(id);
  }, []);

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


  // setTrainingData({
  //   activeExerciseName: activeTraining.exercises[0].exerciseName,
  //   activeExerciseTime: activeTraining.exercises[0].exerciseTime,
  //   nextExerciseName: activeTraining.exercises[1].exerciseName,
  //   nextExerciseTime: activeTraining.exercises[1].exerciseTime,
  // });

    console.log(trainingData)
  // if (activeTraining !== null) {


  // console.log(trainingData);

  // const startTraining = () => {
  //   const time = exercises[0].exerciseTime;

  //   // while(time > 0) {
  //   //   setTrainingData({...trainingData, activeExerciseTime: time})
  //   //   time--;
  //   // }

  //   // for(let i = 0; i < reps; i++) {
  //   //   for(let j = 0; j < exercises.length; j++) {
  //   //     let activeExerciseName = exercises[j].exerciseName;
  //   //     let activeExerciseTime = exercises[j].exerciseTime;
  //   //     let nextExerciseName = exercises[j+1].exerciseName;

  //       // const count = setInterval(() => {
  //       //   activeExerciseTime--;
  //       //   if(activeExerciseTime === 0) {
  //       //     clearInterval(count);
  //       //   }
  //       // }, 1000);

  //       // setTrainingData({
  //       //   activeExerciseName: activeExerciseName,
  //       //   activeExerciseTime: parseInt(activeExerciseTime) - 1,
  //       //   nextExerciseName: nextExerciseName,
  //       // })

  //     // }
  //   }

  // if (activeTraining) {
    const {
      name,
      totalTime,
      reps,
      exercises,
      repsRestTime,
      exerciseRestTime,
    } = activeTraining;

    return (
      <UserPanelTemplate pageTitle={name} activeAppPanelNav>
        <StyledWrapper>
          <StyledActiveExerciseTitle>
            {exercises[0].exerciseName}
          </StyledActiveExerciseTitle>
          <StyledTimeWrapper>{exercises[0].exerciseTime}</StyledTimeWrapper>
          <StyledNextExerciseTitle>
            {/* {nextExerciseName} - {nextExerciseTime} */}
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
  // } else return null;
};

AppPanelPage.propTypes = {
  getTraining: PropTypes.func.isRequired,
  activeTraining: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  activeTraining: state.training.activeTraining,
});

export default connect(mapStateToProps, { getTraining })(AppPanelPage);

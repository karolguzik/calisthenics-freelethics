import React from 'react';
import PropTypes from 'prop-types';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import CardTraining from '../components/CardTraining/CardTraining';
import { connect } from 'react-redux';

const TrainingsPage = ({ trainings, authUser }) => {
  const calcTrainingTotalTime = (exercises, repsNumber) => {
    let total = 0;
    exercises.reduce((counter, exercise) => {
      return total = counter + exercise.time;
    }, 0);
    return parseInt((total * repsNumber) / 60);
  };

  const trainingsList = trainings.map(
    ({ id, title, repsNumber, repsRestTime, exerciseRestTime, exercises }) => {
      let trainingTotalTime = calcTrainingTotalTime(exercises, repsNumber);

      return (
        <CardTraining
          id={id}
          key={id}
          title={title}
          totalTime={trainingTotalTime}
          repsNumber={repsNumber}
          exercisesNumber={exercises.length}
          repsRestTime={repsRestTime}
          exerciseRestTime={exerciseRestTime}
        />
      );
    }
  );

  return (
    <UserPanelTemplate activeTopNav>
      <GridTemplate>{trainingsList}</GridTemplate>
    </UserPanelTemplate>
  );
};

CardTraining.propTypes = {
  trainings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    repsNumber: PropTypes.number.isRequired,
    repsRestTime: PropTypes.number.isRequired,
    exerciseRestTime: PropTypes.number.isRequired,
    exercises: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
    }))
  }))
}

// const mapStateToProps = ({training: { trainings }}) => ({ trainings });
const mapStateToProps = (state) => ({
  trainings: state.training.trainings
})

export default connect(mapStateToProps)(TrainingsPage);

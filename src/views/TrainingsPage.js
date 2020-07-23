import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import CardTraining from '../components/CardTraining/CardTraining';
import Alert from '../components/Alert/Alert';
import { getTrainings } from '../actions/training';

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.fontColorGray};
  font-size: ${({ theme }) => theme.fontSize.m};
  text-align: center;
  margin-top: 3rem;
  animation: slideIn 0.3s ease-in-out;
`;

const StyledGridTemplate = styled(GridTemplate)`
  margin-top: 1rem;
`;

const TrainingsPage = () => {
  const trainings = useSelector(state => state.training.trainings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainings());
  }, [dispatch]);

  const renderTrainings =
    trainings.length > 0 &&
    trainings.map((training) => (
      <CardTraining key={training._id} {...training} />
    ));

  return (
    <UserPanelTemplate pageTitle='trainings'>
      <>
        <Alert />
        {trainings.length > 0 ? (
          <StyledGridTemplate>{renderTrainings}</StyledGridTemplate>
        ) : (
          <StyledParagraph>Create your training</StyledParagraph>
        )}
      </>
    </UserPanelTemplate>
  );
};


export default TrainingsPage;

import React from 'react';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import CardTraining from '../components/CardTraining/CardTraining';

const TrainingsPage = () => (
  <UserPanelTemplate activeTopNav>
    <GridTemplate>
      <CardTraining />
      <CardTraining />
      <CardTraining />
      <CardTraining />
    </GridTemplate>
  </UserPanelTemplate>
);

export default TrainingsPage;
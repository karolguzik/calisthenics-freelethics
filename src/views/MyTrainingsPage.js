import React from 'react';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import CardTraining from '../components/CardTraining/CardTraining';

const MyTrainingsPage = () => (
  <UserPanelTemplate>
    <GridTemplate>
      <CardTraining />
      <CardTraining />
    </GridTemplate>
  </UserPanelTemplate>
);

export default MyTrainingsPage;
import React from 'react'
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';

const StyledWrapper = styled.div`

`;

const TrainingDetailsPage = () => (
  <UserPanelTemplate pageTitle="example training">
    <StyledWrapper>
      <p>example training details</p>
    </StyledWrapper>
  </UserPanelTemplate>
);


export default TrainingDetailsPage;
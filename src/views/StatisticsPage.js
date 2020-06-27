import React from 'react';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';

const StyledWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StatisticsPage = () => (
  <UserPanelTemplate pageTitle='statistics'>
    <StyledWrapper>
      <h1>Statistics page</h1>
    </StyledWrapper>
  </UserPanelTemplate>
);

export default StatisticsPage;

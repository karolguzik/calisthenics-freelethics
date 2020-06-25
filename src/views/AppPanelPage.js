import React from 'react';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';

const AppPanelPage = () => {
  return (
    <UserPanelTemplate pageTitle="Application panel" activeAppPanelNav>
      <h1>Welcome in application panel</h1>
    </UserPanelTemplate>
  )
}

export default AppPanelPage;
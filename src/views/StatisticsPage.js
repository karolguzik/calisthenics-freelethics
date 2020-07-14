import React from 'react';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import Button from '../components/Button/Button';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../actions/auth';

const StyledWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StatisticsPage = () => {
  const dispatch = useDispatch();

  return (
    <UserPanelTemplate pageTitle='statistics'>
      <StyledWrapper>
        <h1>Statistics page</h1>
        <Button tertiary onClick={() => dispatch(deleteAccount())}>
          Delete account
        </Button>
      </StyledWrapper>
    </UserPanelTemplate>
  );
};

export default StatisticsPage;

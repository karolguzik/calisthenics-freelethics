import React from 'react';
import styled from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import Button from '../components/Button/Button';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';


const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  margin-top: 2rem;
  grid-template-columns: 90%;

  @media ${device.tablet} {
    grid-auto-rows: auto;
    grid-template-columns: 70%;
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(2, 25%);
    justify-content: center;
    grid-gap: 2rem;
  }
`;

const StyledInnerWrapper = styled.div`
  width: 90%;
  margin: 0 auto 2rem;

  & > * {
    margin: 1rem 0;
  }

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.tablet} {
    width: 70%;
  }

  @media ${device.laptopL} {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const StyledButtonWrapper = styled.div`
  @media ${device.laptopL} {
    align-self: flex-start;
    flex-basis: 100%;
    text-align:center;
  }
`;

const StyledButton = styled(Button)`
  margin: 0.5rem 0.5rem 0.5rem 0;
`;

const StyledHr = styled.hr`
  border: 1px solid ${({ theme }) => theme.bgcDarkSecondary};
`;

const TrainingDetailsPage = () => {
  return (
    <UserPanelTemplate pageTitle='example training'>
      <>
        <StyledInnerWrapper>
          <SummaryTraining />
          <StyledButtonWrapper>
            <StyledButton quatenary>Start in app</StyledButton>
            <StyledButton tertiary>Delete</StyledButton>
          </StyledButtonWrapper>
        </StyledInnerWrapper>
        <StyledHr></StyledHr>
        <StyledGridTemplate>
          <p>Push up's - 60 seconds</p>
          <p>Pull up's - 60 seconds</p>
          <p>Burpees - 60 seconds</p>
          <p>Sprawls - 45 seconds</p>
          <p>Jumps - 60 seconds</p>
          <p>Dip's - 60 seconds</p>
          <p>Dip's - 60 seconds</p>
          <p>Dip's - 60 seconds</p>
          <p>Dip's - 60 seconds</p>
          <p>Dip's - 60 seconds</p>
        </StyledGridTemplate>
      </>
    </UserPanelTemplate>  
  )
};

export default TrainingDetailsPage;

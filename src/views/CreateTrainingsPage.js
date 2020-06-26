import React from 'react'
import styled from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';


// TODO think about separate this form into components form

const StyledWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  @media ${device.mobileL} {
    width: 80%;
  }

  @media ${device.tablet} {
    width:70%;
  }
`;

const StyledForm = styled.form`
  width:100%;
`;

const StyledInput = styled(Input)`
  margin: 1rem 0;
  color: ${({theme}) => theme.fontColorLight};
  background: ${({theme}) => theme.bgcDarkSecondary};
  border: 1px solid ${({theme}) => theme.bgcDarkTertiary};
  border-radius: 20px;
`;

const StyledButton = styled(Button)`
  margin: 1rem 1rem 1rem 0;
`;

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  grid-template-columns: 100%;
  margin:2rem 0;

  @media ${device.mobileL} {
    grid-template-columns: 100%;
  }

  @media ${device.tablet} {
    grid-auto-rows: auto;
  }
`;

const StyledSummaryWrapper = styled.div`
  margin: 3rem 0;

  & > *{
    margin: 1rem 0;
  }
`;

const StyledHr = styled.hr`
  border: 1px solid ${({theme}) => theme.bgcDarkSecondary};
`;

const CreateTrainingsPage = () => (
  <UserPanelTemplate pageTitle="create your training">
    <StyledWrapper>
      <StyledForm>
        <StyledInput type='text' name='training-name' placeholder='training name' />
        <StyledInput type='text' name='exercise-name' placeholder='exercise name' />
        <StyledInput type='number' name='reps-number' placeholder='reps number' />
        <StyledInput type='number' name='exercise-time' placeholder='exercise time' />
        <StyledInput type='number' name='exercise-rest-time' placeholder='exercise rest time' />
        <StyledInput type='number' name='exercise-rest-time' placeholder='reps rest time' />
        <StyledButton type='submit' quatenary>Add</StyledButton>
        <StyledButton tertiary>Clear</StyledButton>
      </StyledForm>
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
      <StyledHr></StyledHr>
      <StyledSummaryWrapper>
        <SummaryTraining />
      </StyledSummaryWrapper>
    </StyledWrapper>
  </UserPanelTemplate>
)

export default CreateTrainingsPage;
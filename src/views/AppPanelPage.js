import React from 'react';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import SummaryTraining from '../components/SummaryTraining/SummaryTraining';

const StyledWrapper = styled.div`
  width: 90%;
  height:100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const StyledActiveExerciseTitle = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.s};
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 10px;
`;

const StyledTimeWrapper = styled.div`
  margin-top:2rem;
  font-size: ${({ theme }) => theme.fontSize.xxxl};
  font-weight:${({ theme }) => theme.fontWeight.extraBold};
  text-transform: uppercase;
  text-align:center;
  letter-spacing: 10px;
`;

const StyledNextExerciseTitle = styled.p`
  margin-top: 2rem;
  color: ${({ theme }) => theme.colorExtraTertiary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-align: right;
`;

const StyledSummaryTrainingWrapper = styled.div`
  margin: 4rem 0 0 auto;
`;

const StyledSummaryTrainingTitle = styled.h3`
  text-transform: uppercase;
  margin-bottom: 1rem;
`


const AppPanelPage = () => {
  return (
    <UserPanelTemplate pageTitle='Application panel' activeAppPanelNav>
      <StyledWrapper>
        <StyledActiveExerciseTitle>pull up's</StyledActiveExerciseTitle>
        <StyledTimeWrapper>60</StyledTimeWrapper>
        <StyledNextExerciseTitle>
          Next: push up's - 90 seconds
        </StyledNextExerciseTitle>
        <StyledSummaryTrainingWrapper>
          <StyledSummaryTrainingTitle>Left :</StyledSummaryTrainingTitle>
          <SummaryTraining/>
        </StyledSummaryTrainingWrapper>
      </StyledWrapper>
    </UserPanelTemplate>
  );
};

export default AppPanelPage;

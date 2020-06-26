import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';

const StyledWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  grid-template-columns: 100%;
  margin: 3rem 0;
`;

const StyledMonthName = styled.p`
  text-align: center;
`;

const StyledProgressWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  & > * {
    flex-basis: 45%;
  }
`;

const StyledDate = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

const StyledHr = styled.hr`
  flex-basis: 5%;
  border: 1px solid ${({ theme }) => theme.colorExtraQuatenary};
`;

const StyledTraining = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  padding: .5rem;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.fontColorDark};
  background: ${({ theme, done }) =>
    done ? theme.colorExtraTertiary : theme.colorExtraSecondary};
  border-radius: 20px;
  text-transform: uppercase;
  overflow: hidden;
  cursor: pointer;
`;

const StyledCheck = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colorExtraTertiary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  transform: translateY(100%);
  transition: 0.2s ease-in-out;

  ${StyledTraining}:hover & {
    transform: translateY(0);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ProgressPage = () => (
  <UserPanelTemplate pageTitle='progress'>
    <StyledWrapper>
      <StyledMonthName>JUNE 2020</StyledMonthName>
      <StyledGridTemplate>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining done={true} as={StyledLink} to='/trainings/details/5'>
            full body workout
            <StyledCheck>Check</StyledCheck>
          </StyledTraining>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining>rest</StyledTraining>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining done>
            full body workout
            <StyledCheck>Check</StyledCheck>
          </StyledTraining>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining>rest</StyledTraining>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining done>
            full body workout
            <StyledCheck>Check</StyledCheck>
          </StyledTraining>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTraining done>
            full body workout
            <StyledCheck>Check</StyledCheck>
          </StyledTraining>
        </StyledProgressWrapper>
      </StyledGridTemplate>
    </StyledWrapper>
  </UserPanelTemplate>
);

export default ProgressPage;

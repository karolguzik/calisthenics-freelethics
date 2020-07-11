import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';
import UserPanelTemplate from '../templates/UserPanelTemplate';
import GridTemplate from '../templates/GridTemplate';

const StyledWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  @media ${device.mobileL} {
    width: 80%;
  }
`;

const StyledGridTemplate = styled(GridTemplate)`
  grid-auto-rows: auto;
  grid-template-columns: 100%;
  margin: 3rem 0;

  @media ${device.mobileL} {
    grid-template-columns: 100%;
  }

  @media ${device.tablet} {
    grid-auto-rows: auto;
    grid-template-columns: 90%;
  }

  @media ${device.laptopL} {
    grid-template-columns: 40% 40%;
    grid-gap: 2rem;
  }
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

  @media ${device.tablet} {
    border-radius: 30px;
  }

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

  @media ${device.laptop} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }

  @media ${device.laptopL} {
    font-size: ${({ theme }) => theme.fontSize.xxs};
  }
`;

const StyledHr = styled.hr`
  flex-basis: 5%;
  border: 1px solid ${({ theme }) => theme.colorExtraQuatenary};
`;

const StyledTrainingContainer = styled.div`
  position: relative;
  align-self: stretch;
  overflow: hidden;
  cursor: pointer;
`;

const StyledTraining = styled.div`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem; 
  color: ${({ theme, done }) =>
    done ? theme.colorExtraTertiary : theme.colorExtraSecondary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  border-radius: 20px;
  text-transform: uppercase;
  transition: 0.2s ease-in-out;


${({ done }) =>
  done &&
  css`
    ${StyledTrainingContainer}:hover & {
      transform: translateY(-100%);
      opacity: 0;
    }
  `}
  
  @media ${device.tablet} {
    border-radius:30px;
  }

  @media ${device.laptop} {
    border-radius:30px;
    font-size: ${({ theme }) => theme.fontSize.xxs};    
  }

  @media ${device.laptopL} {
    font-size: ${({ theme }) => theme.fontSize.xxxs}; 
  }
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
  color: ${({ theme }) => theme.colorExtraTertiary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  transform: translateY(100%);
  transition: 0.2s ease-in-out;

  ${StyledTrainingContainer}:hover & {
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
          <StyledTrainingContainer as={StyledLink} to='/trainings/details/5'>
            <StyledTraining done>full body workout</StyledTraining>
            <StyledCheck>Check</StyledCheck>
          </StyledTrainingContainer>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTrainingContainer>
            <StyledTraining>rest</StyledTraining>
          </StyledTrainingContainer>
        </StyledProgressWrapper>
        <StyledProgressWrapper>
          <StyledDate>Monday 28/06/2020</StyledDate>
          <StyledHr></StyledHr>
          <StyledTrainingContainer>
            <StyledTraining done>full body workout</StyledTraining>
            <StyledCheck>Check</StyledCheck>
          </StyledTrainingContainer>
        </StyledProgressWrapper>
      </StyledGridTemplate>
    </StyledWrapper>
  </UserPanelTemplate>
);

export default ProgressPage;

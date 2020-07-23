import React from 'react';
import styled from 'styled-components';
import PageNotFoundIcon from '../assets/icons/pageNotFound.png';
import { device } from '../mediaQueries/mediaQueries'; 

const StyledWrapper = styled.div`
  padding-top: 30%;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bgcLightSecondary};

  @media ${device.laptopL} {
    padding-top:5%;
  }
`;

const StyledParagraph = styled.p`
  color: ${({ theme }) => theme.fontColorDark};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledIcon = styled.div`
  margin-top: 10%;
  width: 100px;
  height: 100px;
  background-image: url(${PageNotFoundIcon});
  background-size: 100%;
  opacity: .7;

  @media ${device.laptopL} {
    margin-top:3%;
  }
`;

const PageNotFound = () => {
  return (
    <StyledWrapper>
      <StyledParagraph>Sorry, this page does not exist.</StyledParagraph>
      <StyledIcon />
    </StyledWrapper>
  );
};

export default PageNotFound;

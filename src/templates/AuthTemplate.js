import React from 'react';
import styled from 'styled-components';
import { device } from '../mediaQueries/mediaQueries';
import { Link } from 'react-router-dom';
import bgcImage from '../assets/images/bgc-1.png';
import { H2 } from '../components/Heading/Heading';

const StyledWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 80vh;
  margin: 10vh auto;
  padding: 7rem 5rem;
  background: ${({ theme }) => theme.bgcLightPrimary};
  box-shadow: 0 10px 30px -10px #000;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bgcImage});
    background-repeat: no-repeat;
    background-position: 30% 100%;
    background-size: 120%;
    opacity: 0.1;
    z-index: -1;

    @media ${device.tablet} {
      background-size: 80%;
      background-position: 100% 100%;
    }
  }
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${device.tablet} {
    width: 60%;
    margin:0 auto;
  }
`;

const StyledHeadingWrapper = styled.div`
  flex-grow: 1;
`;

const StyledFormWrapper = styled.div`
  flex-grow: 4;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  margin-top: 1rem;
  color: ${({theme}) => theme.fontColorDark};
  font-size: ${({theme}) => theme.fontSize.xxs};
  text-transform: uppercase;
  text-align:center;
`;

const AuthTemplate = ({ children, title, linkPath, linkText }) => (
  <StyledWrapper>
    <StyledInnerWrapper>
      <StyledHeadingWrapper>
        <H2>{title}</H2>
      </StyledHeadingWrapper>
      <StyledFormWrapper>{children}</StyledFormWrapper>
      <StyledLink to={linkPath}>{linkText}</StyledLink>
    </StyledInnerWrapper>
  </StyledWrapper>
);

export default AuthTemplate;

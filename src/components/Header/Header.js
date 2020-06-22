import React from 'react';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import Heading from '../Heading/Heading';
import Button from '../Button/Button';
import Paragraph from '../Paragraph/Paragraph';
import bgcImage from '../../assets/images/bgc-1.png';

const StyledHeader = styled.header`
  width: 80vw;
  height: 85vh;
  margin: 7.5vh auto;
  background: ${({ theme }) => theme.bgcLightPrimary};
  box-shadow: 0 10px 30px -10px #000;
`;

const StyledInnerWrapper = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height: 80%;
  background: ${({theme}) => theme.bgcLightSecondary};

  &::before {
    content: '';
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: url(${bgcImage});
    background-repeat: no-repeat;
    background-position:30% 100%;
    background-size: 120%;
    opacity: .1;
  }
`;

const StyledLogoContainer = styled.div`
  display:flex;
  align-items: center;
  height:10%;
  padding-left:1rem;
`;

const StyledBottomAside = styled.aside`
  display:flex;
  align-items: center;
  justify-content:center;
  height:10%;
  background: rgba(65,65,67, .5);
`;


const Header = () => {
  return (
    <StyledHeader>
      <StyledLogoContainer>
        <Logo>CaF.</Logo>
      </StyledLogoContainer>
      <StyledInnerWrapper>
        <Heading>Calisthenics</Heading>
        <Heading secondary>Freelethics</Heading>
        <Button>start now</Button>
      </StyledInnerWrapper>
      <StyledBottomAside>
        <Paragraph>your future is created by what you do now not tomorrow</Paragraph>
      </StyledBottomAside>
    </StyledHeader>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../Logo/Logo';
import { H1, H2 } from '../Heading/Heading';
import Button from '../Button/Button';
import { Paragraph, ParagraphYellow } from '../Paragraph/Paragraph';
import bgcImage from '../../assets/images/bgc-1.png';

const StyledWrapper = styled.header`
  width: 90vw;
  height: 90vh;
  margin: 5vh auto;
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
  z-index:10;

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
    z-index:-1;
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
    <StyledWrapper>
      <StyledLogoContainer>
        <Logo>CaF.</Logo>
      </StyledLogoContainer>
      <StyledInnerWrapper>
        <H1>Calisthenics</H1>
        <H2 secondary>Freelethics</H2>
        <Button as={Link} to="/login">start now</Button>
      </StyledInnerWrapper>
      <StyledBottomAside>
        <Paragraph>your <ParagraphYellow>future</ParagraphYellow> is created by what you do <ParagraphYellow>now</ParagraphYellow> not tomorrow</Paragraph>
      </StyledBottomAside>
    </StyledWrapper>
  );
};

export default Header;

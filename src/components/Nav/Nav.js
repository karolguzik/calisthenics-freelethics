import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  position:fixed;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  width: 85%;
  height: 10%;
  display:flex;
  align-items:stretch;
  justify-content: space-around;
  background: ${({theme}) => theme.bgcLightPrimary};
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  z-index:10;

  ${({navTop}) => navTop && css`
    top:0;
    height:7.5%;
    width:90%;
    background: ${({theme}) => theme.bgcDarkSecondary};
    border: 1px solid #222;
    border-radius: 0 0 10px 10px;
  `}
`;


export default Nav;
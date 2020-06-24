import styled, { css } from 'styled-components';

export const Nav = styled.nav`
  position:fixed;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  width: 85%;
  height: 15%;
  display:flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${({theme}) => theme.bgcLightPrimary};
  border-radius: 10px 10px 0 0;
  overflow: hidden;

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
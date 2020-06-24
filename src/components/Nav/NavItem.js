import styled, { css } from 'styled-components';

const NavItem = styled.li`
  list-style: none;
  font-size: ${({theme}) => theme.fontSize.xs};

  ${({icon}) => icon && css`
  width: 42px;
  height:42px;
  background-image: url(${({icon}) => icon});
  background-repeat: no-repeat;
  background-size: 40%;
  background-position:center;
  border-radius: 50%;
  box-shadow: .7rem .7rem 2rem rgba(0,0,0,.1),
              -.7rem -.7rem 2rem rgba(255,255,255, .5);
  `};

  :hover {
    box-shadow: inset .7rem .7rem 2rem rgba(0,0,0,.1),
                inset -.7rem -.7rem 2rem rgba(255,255,255, .5);
  }
`;

export default NavItem;
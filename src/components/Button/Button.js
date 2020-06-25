import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 100px;
  padding: .7rem;
  background: ${({theme}) => theme.bgcLightPrimary};
  color: ${({theme}) => theme.fontColorDark};
  font-size: ${({theme}) => theme.fontSize.xxs};
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border: 1px solid ${({theme}) => theme.fontColorDark};
  transition: .2s ease-in-out;
  cursor: pointer;
  outline: none;

  :hover {
    color: ${({theme}) => theme.fontColorLight};
    background: ${({theme}) => theme.bgcDarkPrimary};
  }

  ${({secondary}) => secondary && css`
    background: ${({theme}) => theme.bgcLightSecondary};
    border-radius: 15px;
    border: none;
    box-shadow: 0 3px 10px -5px #000;

    :hover {
      background: ${({theme}) => theme.colorExtraPrimary};
      color: ${({theme}) => theme.fontColorDark};
      transform: scale(1.05);
      box-shadow: 0 5px 10px -5px #000;
    }

    :active {
      transform: scale(1.02);
      box-shadow: 0 4px 10px -5px #000;
    }
  `}
`

export default Button;

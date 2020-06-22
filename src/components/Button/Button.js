import styled from 'styled-components';

const Button = styled.button`
  width: 100px;
  padding: 1rem;
  background: ${({theme}) => theme.bgcLightPrimary};
  color: ${({theme}) => theme.fontColorDark};
  font-size: ${({theme}) => theme.fontSize.xxs};
  text-transform: uppercase;
  border: 1px solid black;
  cursor: pointer;
`

export default Button;

import styled from 'styled-components';

const Logo = styled.span`
  display: inline-block;
  color: ${({theme}) => theme.fontColorDark};
  font-size: ${({theme}) => theme.fontSize.s};
  font-weight: ${({theme}) => theme.fontWeight.bold};
`

export default Logo;

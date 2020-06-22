import styled from 'styled-components';

const Paragraph = styled.p`
  color: ${({theme}) => theme.fontColorDark};
  font-size: ${({theme}) => theme.fontSize.xxs};
`

export default Paragraph;

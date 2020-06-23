import styled from 'styled-components';

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.fontColorDark};
  font-size: ${({ theme }) => theme.fontSize.xxs};
`;

export const ParagraphYellow = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.colorExtraPrimary};
  text-transform: uppercase;
`

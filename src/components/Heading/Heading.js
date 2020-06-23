import styled, { css } from 'styled-components';

export const H1 = styled.h1`
  color: ${({ theme }) => theme.fontColorDark};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

export const H2 = styled.h2`
  background: none;
  color: ${({ theme }) => theme.fontColorDark};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};  
  text-transform: uppercase;

  ${({secondary}) => secondary && css`
    margin: 1rem 0;
    padding: .5rem 1rem;
    background: ${({theme}) => theme.bgcDarkPrimary};
    color: ${({theme}) => theme.fontColorLight};
    font-weight: ${({theme}) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.s};
  `}
`;

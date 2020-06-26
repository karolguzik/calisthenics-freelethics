import styled, { css } from 'styled-components';
import { device } from '../../mediaQueries/mediaQueries';

export const H1 = styled.h1`
  color: ${({ theme }) => theme.fontColorDark};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xl};

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }
`;

export const H2 = styled.h2`
  background: none;
  color: ${({ theme }) => theme.fontColorDark};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontWeight.bold};  
  text-transform: uppercase;

  @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }

  ${({secondary}) => secondary && css`
    margin: 1rem 0;
    padding: .5rem 1rem;
    background: ${({theme}) => theme.bgcDarkPrimary};
    color: ${({theme}) => theme.fontColorLight};
    font-weight: ${({theme}) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.s};

    @media ${device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
  `}
`;

import styled, { css } from 'styled-components';

const Heading = styled.h1`
  color: ${({ theme }) => theme.fontColorDark};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xl};

  ${({ secondary }) =>
    secondary &&
    css`
      margin: 1rem 0;
      padding: .5rem 1rem;
      background: ${({ theme }) => theme.bgcDarkPrimary};
      color: ${({ theme }) => theme.fontColorLight};
      color: ${({ theme }) => theme.fontColorLight};
      font-size: ${({ theme }) => theme.fontSize.s};
      font-weight: ${({ theme }) => theme.fontWeight.regular};
    `}
`;

export default Heading;

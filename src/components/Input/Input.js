import styled from 'styled-components';
import { device } from '../../mediaQueries/mediaQueries';

const Input = styled.input`
  width:100%;
  padding: .5rem 1rem;
  background: rgba(65,65,68, .5);
  color: ${({theme}) => theme.fontColorDark};
  border: none;

  @media ${device.tablet} {
    padding: .8rem;
    font-size: ${({theme}) => theme.fontSize.xs};
  }

  @media ${device.laptop} {
    padding: 1.2rem;
    font-size: ${({theme}) => theme.fontSize.xxs};
  }

  @media ${device.laptopL} {
    padding: .9rem;  
    }
`;

export default Input;

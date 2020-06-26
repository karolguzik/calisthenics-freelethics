import styled from 'styled-components'; 
import { device } from '../mediaQueries/mediaQueries';

const GridTemplate = styled.div`
  display:grid;
  grid-template-columns: 90%;
  grid-auto-rows: 150px;
  justify-content: center;
  gap: 2rem;

  @media ${device.mobileL} {
    grid-template-columns: 80%;
  }

  @media ${device.tablet} {
    grid-template-columns: 60%;
    grid-auto-rows: 200px;
  }
`;

export default GridTemplate;
import React from 'react';
import styled from 'styled-components';
import RangeIcon from '../../assets/icons/calisthenics-range.png';

const StyledRangeIcon = styled.div`
  position: relative;
  margin: 4rem 0 2rem;
  width: 212px;
  height: 80px;
  background-image: url(${() => RangeIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  overflow: hidden;
`;

const StyledRangeInnerBgc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.fontColorGray};
  z-index: -1;
`;

const StyledRangeCoverBgc = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colorExtraQuatenary};
  transform: translateY(100%);
  animation: loadingRegisterIcon 4s ease-in-out forwards;
  z-index: -1;
`;

const RangeProgress = () => (
  <StyledRangeIcon>
    <StyledRangeInnerBgc />
    <StyledRangeCoverBgc />
  </StyledRangeIcon>
);

export default RangeProgress;

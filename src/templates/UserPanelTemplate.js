import React, { css } from 'react';
import { NavLink } from 'react-router-dom'; 
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Nav from '../components/Nav/Nav';
import NavItem from '../components/Nav/NavItem'
import IconTraining from '../assets/icons/training.png';
import IconAdd from '../assets/icons/add.png';
import IconProgress from '../assets/icons/progress.png';
import IconStatistics from '../assets/icons/statistics.png';
import IconLogout from '../assets/icons/logout.png';



const StyledWrapper = styled.div`
  margin:7.5vh 7.5% 15vh;
  padding: 2rem 0;
  min-height: calc(100vh - (7.5vh + 15vh));

`;

const activeClassName = 'active';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({theme}) => theme.fontColorLight};
`;

const StyledActiveNavLink = styled(StyledNavLink).attrs({activeClassName: activeClassName})`
  &.${activeClassName} {
    border-color: ${({theme}) => theme.colorExtraQuatenary};
  }
`;

const UserPanelTemplate = ({children}) => {
  return(
    <StyledWrapper>
      <Nav navTop>
        <NavItem as={StyledActiveNavLink} to="/trainings">Trainings</NavItem>
        <NavItem as={StyledActiveNavLink} to="/mytrainings">My trainings</NavItem>
      </Nav>
      {children}
      <Nav>
        <NavItem as={StyledActiveNavLink} to="/trainings"  icon={IconTraining} />
        <NavItem as={StyledActiveNavLink} to="/createTraining" icon={IconAdd} />
        <NavItem as={StyledActiveNavLink} to="/progress" icon={IconProgress} />
        <NavItem as={StyledActiveNavLink} to="/statistics" icon={IconStatistics} />
        <NavItem exact as={StyledActiveNavLink} to="/" icon={IconLogout} />
      </Nav>
    </StyledWrapper>
  )
}

UserPanelTemplate.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserPanelTemplate;
import React from 'react';
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
  padding:7.5vh 7.5% 15vh;
  height:100vh;
`;

const activeClassName = 'active';

const StyledNavLink = styled(NavLink).attrs({activeClassName: activeClassName})`
  &.${activeClassName} {
    box-shadow: inset .7rem .7rem 2rem rgba(0,0,0,.1),
                inset -.7rem -.7rem 2rem rgba(255,255,255, .5);
  }
`;

const UserPanelTemplate = ({children}) => {
  return(
    <StyledWrapper>
      <Nav navTop>
        <NavItem>Trainings</NavItem>
        <NavItem>My Trainings</NavItem>
      </Nav>
      {children}
      <Nav>
        <NavItem as={StyledNavLink} to="/trainings"  icon={IconTraining} />
        <NavItem as={StyledNavLink} to="/createTraining" icon={IconAdd} />
        <NavItem as={StyledNavLink} to="/progress" icon={IconProgress} />
        <NavItem as={StyledNavLink} to="/statistics" icon={IconStatistics} />
        <NavItem exact as={StyledNavLink} to="/" icon={IconLogout} />
      </Nav>
    </StyledWrapper>
  )
}

UserPanelTemplate.propTypes = {
  children: PropTypes.element.isRequired,
}

export default UserPanelTemplate;
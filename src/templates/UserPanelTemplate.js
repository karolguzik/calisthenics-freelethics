import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Nav from '../components/Nav/Nav';
import NavItem from '../components/Nav/NavItem';
import IconTraining from '../assets/icons/training.png';
import IconAdd from '../assets/icons/add.png';
import IconProgress from '../assets/icons/progress.png';
import IconStatistics from '../assets/icons/statistics.png';
import IconLogout from '../assets/icons/logout.png';
import IconStart from '../assets/icons/start.png';
import IconStop from '../assets/icons/stop.png';
import IconPause from '../assets/icons/pause.png';
import IconGoBack from '../assets/icons/goback.png';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const StyledWrapper = styled.div`
  margin: 7.5vh 7.5% 10vh;
  padding: 2rem 0;
  min-height: calc(100vh - (7.5vh + 10vh));
`;

const activeClassName = 'active';

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.fontColorLight};
`;

const StyledActiveNavLink = styled(StyledNavLink).attrs({
  activeClassName: activeClassName,
})`
  &.${activeClassName} {
    border-color: ${({ theme }) => theme.colorExtraQuatenary};
  }
`;

const StyledPageTitle = styled.p`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const UserPanelTemplate = ({
  children,
  activeTopNav,
  pageTitle,
  activeAppPanelNav,
  logout,
}) => {
  // const renderTopNav = activeTopNav ? (
  //   <>
  //     <NavItem as={StyledActiveNavLink} to="/trainings">Trainings</NavItem>
  //     <NavItem as={StyledActiveNavLink} to="/mytrainings">My trainings</NavItem>
  //   </>
  // ) : (
  //   <StyledPageTitle>{pageTitle}</StyledPageTitle>
  // );

  const renderBottomNav = activeAppPanelNav ? (
    <>
      <NavItem
        as={StyledActiveNavLink}
        exact
        to='/trainings'
        icon={IconGoBack}
      />
    </>
  ) : (
    <>
      <NavItem as={StyledActiveNavLink} to='/trainings' icon={IconTraining} />
      <NavItem as={StyledActiveNavLink} to='/createTraining' icon={IconAdd} />
      <NavItem as={StyledActiveNavLink} to='/progress' icon={IconProgress} />
      <NavItem
        as={StyledActiveNavLink}
        to='/statistics'
        icon={IconStatistics}
      />
      <NavItem
        as={StyledActiveNavLink}
        exact
        to='/'
        icon={IconLogout}
        onClick={logout}
      />
    </>
  );
  return (
    <StyledWrapper>
      <Nav navTop>
        <StyledPageTitle>{pageTitle}</StyledPageTitle>
      </Nav>
      {children}
      <Nav>{renderBottomNav}</Nav>
    </StyledWrapper>
  );
};

UserPanelTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default connect(null, { logout })(UserPanelTemplate);

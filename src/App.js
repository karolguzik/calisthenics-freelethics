import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import MainTemplate from './templates/MainTemplate';
import WelcomePage from './views/WelcomePage';
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';

const App = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={WelcomePage} />
          <Route exact path={routes.login} component={LoginPage} />
          <Route exact path={routes.registration} component={RegistrationPage} />
        </Switch>
      </MainTemplate>
    </Router>
  );
}

export default App;

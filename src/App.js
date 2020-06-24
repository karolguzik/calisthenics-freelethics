import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import MainTemplate from './templates/MainTemplate';
import WelcomePage from './views/WelcomePage';
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';
import TrainingsPage from './views/TrainingsPage';
import CreateTrainingsPage from './views/CreateTrainingsPage';
import ProgressPage from './views/ProgressPage';
import StatisticsPage from './views/StatisticsPage';

const App = () => {
  return (
    <Router>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={WelcomePage} />
          <Route path={routes.login} component={LoginPage} />
          <Route path={routes.registration} component={RegistrationPage} />
          <Route path={routes.trainings} component={TrainingsPage} />
          <Route path={routes.createTrainings} component={CreateTrainingsPage} />
          <Route path={routes.progress} component={ProgressPage} />
          <Route path={routes.statistics} component={StatisticsPage} />
        </Switch>
      </MainTemplate>
    </Router>
  );
}

export default App;

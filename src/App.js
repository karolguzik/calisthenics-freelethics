import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { routes } from './routes';
import MainTemplate from './templates/MainTemplate';
import WelcomePage from './views/WelcomePage';
import LoginPage from './views/LoginPage';
import RegistrationPage from './views/RegistrationPage';
import TrainingsPage from './views/TrainingsPage';
import MyTrainingsPage from './views/MyTrainingsPage';
import CreateTrainingsPage from './views/CreateTrainingsPage';
import TrainingDetailsPage from './views/TrainingDetailsPage';
import AppPanelPage from './views/AppPanelPage';
import ProgressPage from './views/ProgressPage';
import StatisticsPage from './views/StatisticsPage';

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <MainTemplate>
        <Switch>
          <Route exact path={routes.home} component={WelcomePage} />
          <Route path={routes.login} component={LoginPage} />
          <Route path={routes.registration} component={RegistrationPage} />
          <Route exact path={routes.trainings} component={TrainingsPage} />
          <Route path={routes.training} component={TrainingDetailsPage} />
          <Route path={routes.myTrainings} component={MyTrainingsPage} />
          <Route path={routes.createTrainings} component={CreateTrainingsPage} />
          <Route path={routes.progress} component={ProgressPage} />
          <Route path={routes.statistics} component={StatisticsPage} />
          <Route path={routes.appPanel} component={AppPanelPage} />
        </Switch>
      </MainTemplate>
    </HashRouter>
  );
}

export default App;

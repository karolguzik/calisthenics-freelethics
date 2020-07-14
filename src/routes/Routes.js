import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { RoutesTypes } from './RoutesTypes';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../views/LoginPage';
import RegistrationPage from '../views/RegistrationPage';
import TrainingsPage from '../views/TrainingsPage';
import CreateTrainingsPage from '../views/CreateTrainingsPage';
import TrainingDetailsPage from '../views/TrainingDetailsPage';
import AppPanelPage from '../views/AppPanelPage';
import ProgressPage from '../views/ProgressPage';
import StatisticsPage from '../views/StatisticsPage';
import PageNotFound from '../views/PageNotFound';

const Routes = () => (
  <Switch>
    <Route path={RoutesTypes.login} component={LoginPage} />
    <Route path={RoutesTypes.registration} component={RegistrationPage} />
    <PrivateRoute
      exact
      path={RoutesTypes.trainings}
      component={TrainingsPage}
    />
    <PrivateRoute path={RoutesTypes.training} component={TrainingDetailsPage} />
    <PrivateRoute
      path={RoutesTypes.createTrainings}
      component={CreateTrainingsPage}
    />
    <PrivateRoute path={RoutesTypes.progress} component={ProgressPage} />
    <PrivateRoute path={RoutesTypes.statistics} component={StatisticsPage} />
    <PrivateRoute path={RoutesTypes.appPanel} component={AppPanelPage} />
    <Route exact component={PageNotFound} />
  </Switch>
);

export default Routes;

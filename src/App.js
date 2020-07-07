import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RoutesTypes } from './routes/RoutesTypes';
import Routes from './routes/Routes';
import MainTemplate from './templates/MainTemplate';
import WelcomePage from './views/WelcomePage';
import { Provider } from 'react-redux';
import store from './store';
import { authUser } from './actions/auth';
import setAuthToken from './setAuthToken/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(authUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <MainTemplate>
          <Switch>
            <Route exact path={RoutesTypes.home} component={WelcomePage} />
            <Route component={Routes} />
          </Switch>
        </MainTemplate>
      </Router>
    </Provider>
  );
};

export default App;

import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Section1 from '../components/quiz/Section1';
import Section2 from '../components/quiz/Section2';
import Section3 from '../components/quiz/Section3';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import How from '../components/How';
import Excel from '../components/Excel';
import QuizPage from '../components/QuizPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/home" component={LoginPage} exact={true} />
        <PrivateRoute path="/quiz" component={QuizPage} />
        <Route path="/how" component={How} />
        <Route path="/excel" component={Excel} />
        <Route path="/#how" component={How} />
        <Route path="/section1" component={Section1} />
        <Route path="/section2" component={Section2} />
        <Route path="/section3.0" component={Section3} />
        <Route path="/section3.1" component={Section3} />
        <Route path="/section3.2" component={Section3} />
        <Route path="/section3.3" component={Section3} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

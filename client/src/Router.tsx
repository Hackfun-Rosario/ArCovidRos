import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Abm, Home, Login, NoMatch } from './components';
import { isAuthorized } from './utils';

export enum ROUTES {
  ABM = '/abm',
  HOME = '/',
  LOGIN = '/login',
  NO_MATCH = '*',
};

interface RouteItem {
  Component: ReactElement;
  path: string;
  needAuth?: boolean;
  name?: string;
}

const renderPublicRoute = ({ path, Component, name }: RouteItem): ReactElement => {
  return (
    <Route exact={path === '/'} path={path} key={name}>
      <Component />
    </Route>
  )
};
const renderPrivateRoute = ({ path, Component, name }: RouteItem): ReactElement =>
  <Route key={name} path={path} render={() => {
    return isAuthorized() ?
    <Component /> :
    <Redirect to={{ pathname: ROUTES.LOGIN }} />
  }} />

const Routes = (props: any): ReactElement => {
  const config = [{
    Component: Home,
    path: ROUTES.HOME,
    needAuth: false,
    name: 'home',
  }, {
    Component: Abm,
    path: ROUTES.ABM,
    needAuth: true,
    name: 'abm',
  }, {
    Component: Login,
    path: ROUTES.LOGIN,
    needAuth: false,
    name: 'login',
  }, {
    Component: NoMatch,
    path: ROUTES.NO_MATCH,
    needAuth: false,
    name: 'noMatch',
  }];

  return (
    <Router>
      <Switch>
        {config.map((item): ReactElement => {
          return (item.needAuth) ?
            renderPrivateRoute(item) :
            renderPublicRoute(item)
        })}
      </Switch>
    </Router>
  );
};

export default Routes;
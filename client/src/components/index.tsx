import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import Abm from './Abm/index';
import Login from './Login/index';
import Layout from './Layout/index';
import Home from './Home/index';

interface HomeProps {
  children: any;
}

const NoMatch = (): ReactElement => {
  const location = useLocation();

  return (
    <div>No match for <code>{location.pathname}</code></div>
  );
};

export {
  Abm,
  Home,
  Layout,
  Login,
  NoMatch,
}
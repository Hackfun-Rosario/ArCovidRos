import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login/index';

interface HomeProps {
  children: any;
}

const Abm = ({ children }: HomeProps): ReactElement => <h1>Abm</h1>;
const Home = ({ children }: HomeProps): ReactElement => <h1>Home</h1>;
const NoMatch = (): ReactElement => {
  const location = useLocation();

  return (
    <div>No match for <code>{location.pathname}</code></div>
  );
};

export {
  Abm,
  Home,
  Login,
  NoMatch,
}
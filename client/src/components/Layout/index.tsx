import React, { ReactElement } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Grid, Link }  from '@material-ui/core';
import cn from 'classnames';

import { constants, session } from 'utils';
import './styles.scss';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isAuthorized, clearStorage } = session;
  const { ROUTES } = constants;

  const history = useHistory();

  const logOut = (): void => {
    clearStorage();
    history.push(ROUTES.LOGIN);
  };
  const handleLinkClick = (path: string): void => {
    history.push(path);
  };

  return (
    <Grid className={cn('layout': true, {
      'layout--admin': isAuthorized(),
    })} alignItems="center" direction="column" container>
      <Grid className="layout__header" item xs={10}>
        {isAuthorized() && (
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <Link style={{marginRight: '10px'}} onClick={() => handleLinkClick(ROUTES.HOME)}>Inicio</Link>
              <Link style={{marginRight: '10px'}} onClick={() => handleLinkClick(ROUTES.ABM_PROVINCE)}>Alta Provincia</Link>
              <Link onClick={() => handleLinkClick(ROUTES.ABM_CITY)}>Alta Ciudad</Link>
            </Grid>
            <Grid item align="right" xs={8}>
              <Button variant="contained" onClick={logOut}>Cerrar sesión</Button>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid className="layout__content" item xs={10}>{children}</Grid>
    </Grid>
  );
};

export default Layout;
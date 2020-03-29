import React, { ReactElement } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Grid }  from '@material-ui/core';

import { session } from 'utils';
import './styles.scss';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isAuthorized, clearStorage } = session;
  const history = useHistory();
  const logOut = (): void => {
    clearStorage();
    history.push('/login');
  };

  return (
    <Grid className="layout" alignItems="center" direction="column" container>
      <Grid className="layout__header" item xs={10} align="right">
        {isAuthorized() && (
          <Button variant="contained" onClick={logOut}>Cerrar sesión</Button>
        )}
      </Grid>
      <Grid className="layout__content" item xs={10}>{children}</Grid>
    </Grid>
  );
};

export default Layout;
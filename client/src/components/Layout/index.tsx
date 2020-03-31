import React, { ReactElement } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Grid, Link, AppBar, Toolbar, IconButton, Typography, MenuItem, Menu }  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';

import cn from 'classnames';

import { constants, session } from 'utils';
import './styles.scss';

interface LayoutProps {
  children: any;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  const { isAuthorized, clearStorage } = session;
  const { ROUTES } = constants;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const history = useHistory();

  const logOut = (): void => {
    clearStorage();
    history.push(ROUTES.LOGIN);
  };
  const handleLinkClick = (path: string): void => {
    history.push(path);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="regular" >
        <Grid container direction="row" alignItems="center" > 
          <Grid xs={1}/>
            <Grid xs={9} >
              <Typography variant="h6" >
              Covid-19 HackFun
              </Typography>
            </Grid>
            <Grid xs={1}>      
              <IconButton edge="end"  color="inherit" aria-label="menu">
                <a style={{ color: "white" }} href="https://github.com/Hackfun-Rosario/ArCovidRos">
                  <GitHubIcon/>
                </a>
              </IconButton>
            </Grid>
            <Grid xs={1}>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
              <MenuItem onClick={handleMenuClose}>
                <Link style={{ marginRight: '10px' }} onClick={() => handleLinkClick(ROUTES.HOME)}>Inicio</Link>
              </MenuItem>
              {isAuthorized() && (
                <div>
                  <MenuItem onClick={handleMenuClose}>
                    <Link style={{marginRight: '10px'}} onClick={() => handleLinkClick(ROUTES.ABM_PROVINCE)}>Alta Provincia</Link>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Link onClick={() => handleLinkClick(ROUTES.ABM_CITY)}>Alta Ciudad</Link>
                  </MenuItem>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </div>
              )
            }
            {!isAuthorized() && (
              <MenuItem onClick={handleMenuClose}>
                <Link onClick={() => handleLinkClick(ROUTES.LOGIN)}>Login</Link>
              </MenuItem>
            )}
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    <div>
      <Grid className="layout__content" item xs={10}>{children}</Grid>
    </div>
  </div>
  );
};

export default Layout;




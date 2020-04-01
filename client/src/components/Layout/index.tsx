import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import GitHubIcon from "@material-ui/icons/GitHub";
import HackFunIcon from "../Icons/Ico01.svg";

import cn from "classnames";

import { constants, session } from "utils";
import "./styles.scss";

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
      <AppBar style={{ background: "#00011A" }} position="static">
        <Toolbar variant="regular">
          <Grid container direction="row" alignItems="center">
            <Grid style={{ margin: "0 15px" }}>
              <img src={HackFunIcon} width="60px" />
            </Grid>
            <Grid xs={10}>
              <Typography variant="h6">HackFun</Typography>
            </Grid>
            <Grid>
              <IconButton edge="end" color="inherit" aria-label="menu">
                <a
                  style={{ color: "white" }}
                  href="https://github.com/Hackfun-Rosario/ArCovidRos"
                >
                  <GitHubIcon />
                </a>
              </IconButton>
            </Grid>
            <Grid>
              <IconButton
                style={{ marginLeft: "15px" }}
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link
                    style={{
                      marginRight: "10px",
                      textDecoration: "none",
                      color: "black",
                    }}
                    onClick={() => handleLinkClick(ROUTES.HOME)}
                  >
                    Inicio
                  </Link>
                </MenuItem>
                {isAuthorized() && (
                  <div>
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        style={{
                          marginRight: "10px",
                          textDecoration: "none",
                          color: "black",
                        }}
                        onClick={() => handleLinkClick(ROUTES.ABM_PROVINCE)}
                      >
                        Alta Provincia
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        onClick={() => handleLinkClick(ROUTES.ABM_CITY)}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Alta Ciudad
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </div>
                )}
                {!isAuthorized() && (
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      onClick={() => handleLinkClick(ROUTES.LOGIN)}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Login
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

import React, { ReactElement } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Abm from "./Abm/index";
import Login from "./Login/index";
import Layout from "./Layout/index";
import Home from "./Home/index";
import { Button, Typography } from "@material-ui/core";

import { constants, session } from "utils";

interface HomeProps {
  children: any;
}

const NoMatch = (): ReactElement => {
  const location = useLocation();

  const { isAuthorized, clearStorage } = session;
  const { ROUTES } = constants;

  const history = useHistory();

  const handleLinkClick = (path: string): void => {
    history.push(path);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          padding: "150px 50px 150px 50px",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px #666 ",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          La ruta <code>{location.pathname}</code> es inválida
        </Typography>
        <Button
          style={{
            color: "#00ff8b",
            borderColor: "#00ff8b",
            fontWeight: "bold",
          }}
          variant="outlined"
          onClick={() => handleLinkClick(ROUTES.HOME)}
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export { Abm, Home, Layout, Login, NoMatch };

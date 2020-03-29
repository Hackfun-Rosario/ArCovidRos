import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function Header() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit">Cerrar sesión</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
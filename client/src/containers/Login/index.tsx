import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import './styles.scss';

interface LoginProps {
  handleClick?: () => void;
}

const Login = ({ handleClick }: LoginProps) => {
  return (
    <Grid className="login" container justify="center" direction="column" spacing={3} xs={3}>
      <Grid item>
        <Typography variant="h5">Personal autorizado</Typography>
      </Grid>
      <Grid item>
        <TextField fullWidth placeholder="Ingrese usuario" />
      </Grid>
      <Grid item>
        <TextField fullWidth placeholder="Ingrese contraseña" />
      </Grid>
      <Grid item align="right">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Iniciar sesion
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
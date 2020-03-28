import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import './styles.scss';
import { useHistory } from "react-router-dom";
import { isAuthorized } from '../../utils';
import { METHODS, ENDPOINTS } from '../../common/contants';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  let history = useHistory();

  const handleClick = async () => {
    setLoading(true);

    await axios({
      method: METHODS.POST,
      url: ENDPOINTS.LOGIN,
      data: {
        username,
        password,
      }
    }).then((response) => {
      const { data: { token }} = response;

      localStorage.setItem('covidapi', JSON.stringify({ token: token }));
      history.push('/abm');
    }).catch((error) => {
      console.warn('Error while tryng to log in', error);
    });

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthorized()) {
      // TODO: ADD MORE SECURITY IN THIS ONE.
      history.push('/crud');
    }
  }, [])

  return (
    <Grid className="login" container justify="center" direction="column" spacing={3} xs={3}>
      <Grid item>
        <Typography variant="h5">Personal autorizado</Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          placeholder="Ingrese usuario"
          required
          onChange={event => {
            setUsername(event?.target?.value);
          }}
          value={username}
        />
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          placeholder="Ingrese contraseña"
          required
          onChange={event => {
            setPassword(event?.target?.value);
          }}
          type="password"
          value={password}
        />
      </Grid>
      <Grid item align="right">
        <Button
          color="primary"
          disabled={loading}
          variant="contained"
          onClick={handleClick}
        >
          Iniciar sesion
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
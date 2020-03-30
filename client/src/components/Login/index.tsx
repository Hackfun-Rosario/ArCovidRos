import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { METHODS, ENDPOINTS } from 'utils/constants';
import { Layout } from 'components';
import { session } from 'utils';
import './styles.scss';

const Login = () => {
  const { isAuthorized } = session;
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
      history.push('/abm/province');
    }
  }, [])

  return (
    <Layout className="login">
      <Grid className="login__content" container direction="column" spacing={3} xs={4}>
        <Grid item>
          <Typography variant="h5">Personal autorizado</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Usuario"
            fullWidth
            required
            onChange={event => {
              setUsername(event?.target?.value);
            }}
            value={username}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Contraseña"
            fullWidth
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
    </Layout>
  );
};

export default Login;
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import './styles.scss';

enum METHODS {
  GET = 'get',
  POST = 'post',
};
const BASE_URL = 'https://covidapi.hackfunrosario.com/api';
enum ENDPOINT {
  LOGIN = '/auth/signIn',
};

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    await axios({
      method: METHODS.POST,
      url: BASE_URL + ENDPOINT.LOGIN,
      data: {
        username,
        password,
      }
    }).then((response) => {
      // TODO: SAVE TOKEN HERE
      console.log('response', response);
    }).catch((error) => {
      console.warn('Error while tryng to log in', error);
    }).finally(() => setLoading(false));
  };

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
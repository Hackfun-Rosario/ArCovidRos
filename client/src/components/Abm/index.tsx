import axios from 'axios';
import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import './styles.scss';
import moment from 'moment';
import { METHODS, ENDPOINTS } from '../../common/contants';

const Abm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async () => {
    setLoading(true);

    await axios({
      method: METHODS.POST,
      url: ENDPOINTS.ABM,
      data: {

      }
    }).then((response) => {

    }).catch((error) => {
      console.warn('Error while tryng to log in', error);
    });

    setLoading(false);
  };

  const [date, setDate] = useState<date>(moment().format('DD MM YYYY'));
  const [province, setProvince] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [zone, setZone] = useState<string>('');
  const [cases, setCases] = useState<number>('');
  const [newCases, setNewCases] = useState<number>('');
  const [deads, setDeads] = useState<number>('');
  const [newDeads, setNewDeads] = useState<number>('');
  const [recover, setRecover] = useState<number>('');
  const [newRecover, setNewRecover] = useState<number>('');
  const [url, setUrl] = useState<string>('');

  return (

    <Grid className="login" container justify="center" direction="row" spacing={4} xs={6}>
      <Grid item xs={12}>
        <Typography variant="h5">Alta de casos</Typography>
      </Grid>
      <Grid item xs={6}>
        <Grid item>
          <TextField fullWidth label="Día" required
            value={date} onChange={e => setDate(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Provincia" required
            value={province} onChange={e => setProvince(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Ciudad"
            value={city} onChange={e => setCity(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Departamento"
            value={department} onChange={e => setDepartment(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Zona"
            value={zone} onChange={e => setZone(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Total de confirmados" required
            value={cases} onChange={e => setCases(e?.target?.value)} />
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Grid item>
          <TextField fullWidth label="Nuevos casos" required
            value={newCases} onChange={e => setNewCases(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Total de muertos"
            value={deads} onChange={e => setDeads(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Nuevos muertos"
            value={newDeads} onChange={e => setNewDeads(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Total de recuperados" required
            value={recover} onChange={e => setRecover(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Nuevos recuperados" required
            value={newRecover} onChange={e => setNewRecover(e?.target?.value)} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Url" required
            value={url} onChange={e => setUrl(e?.target?.value)} />
        </Grid>
      </Grid>

      <Grid item xs={12} align="right">
        <Button color="primary" disabled={loading} variant="contained" onClick={handleClick}>Agregar</Button>
      </Grid>
    </Grid>
  );
};

export default Abm;
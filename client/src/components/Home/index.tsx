import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Layout } from 'components';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(
  fecha: string,
  prov: string,
  ciudad:string,
  depto: string,
  confTot: number,
  confDif: number,
  mueTot: number,
  mueDif: number,
  recTot: number,
  recDif: number,
  ) {
  return {
    fecha ,
  prov ,
  ciudad,
  depto ,
  confTot ,
  confDif ,
  mueTot ,
  mueDif ,
  recTot ,
  recDif
   };
}

const rows = [
  createData('2020-03-19 00:00', 'Santa Fe', 'Rosario','Rosario', 10 ,0 , 5 , 0 , 3 , 1),
];


const Home = () => (

    <Layout>
        <Grid container >
          <Grid item xs={12}>
            <Typography variant="h5" align="center">COVID-19 Argentina</Typography>

          </Grid>
          <Grid xs={12}>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Fecha</TableCell>
                      <TableCell align="center">Provincia</TableCell>
                      <TableCell align="center">Ciudad</TableCell>
                      <TableCell align="center">Departamento</TableCell>
                      <TableCell align="center">Con&nbsp;=</TableCell>
                      <TableCell align="center">Con&nbsp;+</TableCell>
                      <TableCell align="center">Mue&nbsp;=</TableCell>
                      <TableCell align="center">Mue&nbsp;+</TableCell>
                      <TableCell align="center">Rec&nbsp;=</TableCell>
                      <TableCell align="center">Rec&nbsp;+</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row,indice) => (
                      <TableRow key={indice}>
                        <TableCell component="th" scope="row" align="center">
                          {row.fecha}
                        </TableCell>
                        <TableCell align="center">{row.prov}</TableCell>
                        <TableCell align="center">{row.ciudad}</TableCell>
                        <TableCell align="center">{row.depto}</TableCell>
                        <TableCell align="center">{row.confTot}</TableCell>
                        <TableCell align="center">{row.confDif}</TableCell>
                        <TableCell align="center">{row.mueTot}</TableCell>
                        <TableCell align="center">{row.mueDif}</TableCell>
                        <TableCell align="center">{row.recTot}</TableCell>
                        <TableCell align="center">{row.recDif}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
        </Grid>
      </Layout>


);

export default Home;
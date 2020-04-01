import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import { Layout } from "components";
import { METHODS, ENDPOINTS } from "utils/constants";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<stat[]>([]);

  useEffect(() => {
    setLoading(true);
    const getStats = async () => {
      axios({
        method: METHODS.GET,
        url: ENDPOINTS.ABM,
      })
        .then((response) => {
          const { data } = response;
          setData(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.warn("Error while getting stats", error);
          setLoading(false);
        });
    };

    getStats();
  }, []);

  return (
    <Layout>
      <Grid container>
        <Grid xs={12}>
          <TableContainer component={Paper}>
            <Table style={{ position: "relative" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Provincia</TableCell>
                  <TableCell align="center">Con&nbsp;=</TableCell>
                  <TableCell align="center">Con&nbsp;+</TableCell>
                  <TableCell align="center">Mue&nbsp;=</TableCell>
                  <TableCell align="center">Mue&nbsp;+</TableCell>
                  <TableCell align="center">Rec&nbsp;=</TableCell>
                  <TableCell align="center">Rec&nbsp;+</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading && (
                  <LinearProgress
                    style={{ position: "absolute", width: "100%", bottom: 0 }}
                  />
                )}
                {!loading &&
                  data.map((item, index) => {
                    const {
                      fecha,
                      provincia: prov,
                      confirmados_total: confTot,
                      confirmados_dif: confDif,
                      muertes_total: mueTot,
                      muertes_dif: mueDif,
                      recuperados_total: recTot,
                      recuperados_dif: recDif,
                    } = item;

                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center">
                          {moment(fecha).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center">{prov}</TableCell>
                        <TableCell align="center">{confTot}</TableCell>
                        <TableCell align="center">{confDif}</TableCell>
                        <TableCell align="center">{mueTot}</TableCell>
                        <TableCell align="center">{mueDif}</TableCell>
                        <TableCell align="center">{recTot}</TableCell>
                        <TableCell align="center">{recDif}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;

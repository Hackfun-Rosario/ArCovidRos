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
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

import { Layout } from "components";
import { METHODS, ENDPOINTS } from "utils/constants";
import { getHeapStatistics } from "v8";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<stat[]>([]);
  const [page, setPage] = useState<number>(0);

  const getStats = async (page = 0) => {
    axios({
      method: METHODS.GET,
      url: ENDPOINTS.ABM + `/${page}`,
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getStats(newPage);
  };

  useEffect(() => {
    setLoading(true);
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
                  <TableCell align="center">Departamento</TableCell>
                  <TableCell align="center">Confirmados</TableCell>
                  <TableCell align="center">Muertes</TableCell>
                  <TableCell align="center">Recuperados</TableCell>
                  <TableCell align="center">Tests</TableCell>
                  <TableCell align="center">Tests Negativos</TableCell>
                  <TableCell align="center">Tipo de transmisión</TableCell>
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
                      departamento: dept,
                      confirmados: conf,
                      muertes: muer,
                      recuperados: recup,
                      tests: tests,
                      tests_negativos: ntests,
                      tipo_transmision: transm,
                    } = item;

                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row" align="center">
                          {moment.utc(fecha).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center">{prov}</TableCell>
                        <TableCell align="center">{dept}</TableCell>
                        <TableCell align="center">{conf}</TableCell>
                        <TableCell align="center">{muer}</TableCell>
                        <TableCell align="center">{recup}</TableCell>
                        <TableCell align="center">{tests}</TableCell>
                        <TableCell align="center">{ntests}</TableCell>
                        <TableCell align="center">{transm}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25]}
            component="div"
            count={-1}
            rowsPerPage={25}
            page={page}
            onChangePage={handleChangePage}
          />
        </Grid>
      </Grid>
      <Grid>
        <Typography variant="body2" align="right">
          {" "}
          Referencia: <b>Con</b>firmados • <b>Mue</b>rtos • <b>Rec</b>uperados •{" "}
          <b>+</b> Nuevos • <b> = </b> Total &nbsp; &nbsp;
        </Typography>
      </Grid>
    </Layout>
  );
};

export default Home;

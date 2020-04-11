import axios from "axios";
import React, { useState } from "react";
import { Button, Grid, TextField, Typography } from "@material-ui/core";
import moment from "moment";

import { METHODS, ENDPOINTS } from "utils/constants";
import { Layout } from "components";

const Abm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    axios
      .post(ENDPOINTS.ABM, {
        fecha: date,
        provincia: province,
        departamento: depto,
        confirmados: cases,
        muertes: death,
        recuperados: recover,
        tests: tests,
        tests_negativos: negtests,
        url: url,
      })
      .then((response) => {
        console.log("enviado el post");
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Error while trying to save data", error);
        setLoading(false);
      });
  };

  const [date, setDate] = useState<date>("");
  const [province, setProvince] = useState<string>("");
  const [depto, setDepto] = useState<string>("");
  const [cases, setCases] = useState<number>(null);
  const [death, setDeath] = useState<number>(null);
  const [recover, setRecover] = useState<number>(null);
  const [tests, setTests] = useState<number>(null);
  const [negtests, setNegTests] = useState<number>(null);
  const [url, setUrl] = useState<string>("");

  return (
    <Layout>
      <Grid container justify="center" direction="row" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5">Alta de casos por Provincia</Typography>
        </Grid>

        <Grid item xs={6}>
          <Grid item>
            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Provincia"
              value={province}
              onChange={(e) => setProvince(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Departamento"
              value={depto}
              onChange={(e) => setDepto(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Confirmados"
              type="number"
              value={cases}
              onChange={(e) => setCases(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Muertos"
              type="number"
              value={death}
              onChange={(e) => setDeath(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Recuperados"
              type="number"
              value={recover}
              onChange={(e) => setRecover(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Tests"
              type="number"
              value={tests}
              onChange={(e) => setTests(e?.target?.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Tests Negativos"
              type="number"
              value={negtests}
              onChange={(e) => setNegTests(e?.target?.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Url"
              value={url}
              onChange={(e) => setUrl(e?.target?.value)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} align="right">
          <Button
            color="primary"
            disabled={loading}
            variant="contained"
            onClick={handleClick}
          >
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Abm;
